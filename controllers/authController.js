
const jwt = require('jsonwebtoken');
const { User } = require('../models/userModel');
const nodemailer = require('nodemailer');
const crypto = require('crypto-js');
const { validationResult } = require('express-validator');
const MongoUser = require('../schema/user');

exports.signup = async (req, res) => {
  try {
    const errors = validationResult(req.body);
    if(!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const { username, firstName, lastName, email, password, age } = req.body;
    console.log(req.body);
    
    const userExist = await User.findOne({ where: { email } });
    const mongoUserExist = await MongoUser.findOne({ email });
    if (userExist) return res.status(400).send("User already exists.");
    
    const hashedPassword = crypto.AES.encrypt(password, process.env.SECRET).toString();
    await User.create({ username, firstName, lastName, email, password: hashedPassword, age });
    
    res.status(201).send({ message: 'User registered successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).send("There was a problem registering the user.");
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).send("User not found.");
    
    const validPassword = crypto.AES.decrypt(user.password, process.env.SECRET).toString(crypto.enc.Utf8) == password;
    if (!validPassword) return res.status(400).send("Invalid password.");
    
    const token = jwt.sign({ id: user.id, username: user.username, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
    res.status(200).send({ message: "Login successful!", token });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error during login.");
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).send("User not found.");
    
    const token = crypto.randomBytes(20).toString('hex');
    const expiry = Date.now() + 3600000; // 1 hour
    
    await user.update({ resetPasswordToken: token, resetPasswordExpires: expiry });
    
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    
    const mailOptions = {
      to: email,
      from: process.env.EMAIL_USER,
      subject: 'Password Reset',
      text: `Click the following link to reset your password: http://localhost:3000/reset/${token}`,
    };
    
    await transporter.sendMail(mailOptions);
    
    res.status(200).send('Password reset email sent!');
  } catch (error) {
    console.error(error);
    res.status(500).send("Error during password reset.");
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    
    const user = await User.findOne({ where: { resetPasswordToken: token, resetPasswordExpires: { [Sequelize.Op.gt]: Date.now() } } });
    if (!user) return res.status(400).send("Invalid or expired token.");
    
    const hashedPassword = crypto.AES.encrypt(newPassword, process.env.SECRET).toString();
    await user.update({ password: hashedPassword, resetPasswordToken: null, resetPasswordExpires: null });
    
    res.status(200).send("Password reset successfully.");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error resetting password.");
  }
};
