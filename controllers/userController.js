const {User} = require('../models/userModel')
const { body, validationResult } = require('express-validator');

// exports.postUser = async (req, res) => {
//   try {
//     const user = await User.create(req.body);
//     res.status(201).json(user);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Error creating user', error: error.message });
//   }
// }
exports.postUser = async (req, res) => {
    try {
      const user = new User(req.body);
      await user.save();
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
}

exports.getUser = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
};


exports.getUserbyId = async (req, res, next) => {
  console.log(req.user);
  const { id } = req.query;

  try {
    let users;

    if (id) {
      users = await User.findByPk(id);
      if (!users) {
        return res.status(200).json({ message: `User with id ${id} not found` });
      }
    } else {
      users = await User.findAll({
        attributes: ['id', 'username', 'email'],
      });
    }

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }

}

exports.createUser = async (req, res) => {
  const errors = validationResult(req.body);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const {username, firstName, lastName, email, password, age } = req.body
  await User.create({ username, firstName, lastName, email, password, age });

  res.send('respond with a resource');
}

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName } = req.body;

  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: `User with ID ${id} not found` });
    }

    await user.update({
      firstName: firstName || user.firstName,  // Only update fields that are provided
      lastName: lastName || user.lastName
    });

    res.status(200).json({ message: 'User updated successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating user', error: error.message });
  }
}

exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("posts");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// http://localhost:3000/users/1
exports.deleteUser = async (req, res) => {
  console.log('coming here/...............')
  const { id } = req.params; 
  console.log('The id', id)
  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: `User with ID ${id} not found` });
    }
    await user.destroy();

    res.status(200).json({ message: `User with ID ${id} deleted successfully` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting user', error: error.message });
  }
}

