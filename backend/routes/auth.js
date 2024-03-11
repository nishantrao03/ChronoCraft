// auth.js

const express = require('express');
const UserDetails = require('../models/userDetails'); // Import the UserDetails model

const router = express.Router();

router.post('/api/auth', async (req, res) => {
  const { userID } = req.body;

  // Check if the user already exists in userDetails collection
  const existingUser = await UserDetails.findOne({ userID });
  if (existingUser) {
    return res.status(400).json({ error: 'User already exists' });
  }

  // Create a new user details entry in userDetails collection
  const newUserDetails = new UserDetails({ userID });
  await newUserDetails.save();

  res.status(201).json({ message: 'User signed up successfully' });
});

module.exports = router;
