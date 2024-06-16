// users.js router file
const express = require('express');
const router = express.Router();
const User = require('../models/user');

// GET all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//POST create a new user
router.post('/', async (req, res) => {
    try{
      const { name, email, address, city, password, interested, photo } = req.body;
  
      //Check if user already exists
      const existingUser = await User.findOne({ email: email });
      if (existingUser) {
        return res.status(400).json({ success: false, message: 'User with this email already exists' });
      }
  
      //Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      //Create--with the hashed password
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
      });
  
      await newUser.save();
      res.status(201).json({ success: true, message: 'Registered successfully' });
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ success: false, message: 'Error' });
    }
  });
//router.post('/', async (req, res) => {
 // const user = new User({
 //   name: req.body.name,
  //  email: req.body.email,
 //   password: req.body.password,
//  });

//  try {
//    const newUser = await user.save();
 //   res.status(201).json(newUser);
//  } catch (err) {
//    res.status(400).json({ message: err.message });
//}
//});

// Middleware function to get user by ID
async function getUser(req, res, next) {
  let user;
  try {
    user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: 'Cannot find user' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.user = user;
  next();
}

module.exports = router;
