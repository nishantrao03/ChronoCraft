const express = require('express');
const UserDetails = require('../models/userDetails'); // Import the UserDetails model
const TaskDetails = require('../models/taskDetails');

const router = express.Router();

router.post('/api/tasks', async (req, res) => {
    try {
        // Create a new task entry in taskDetails collection with a unique ID
        const newTask = new TaskDetails(req.body);
        await newTask.save();
    
        // Add the task ID to the userDetails collection corresponding to the user
        //const { userID } = req.body;
        // Here you need to add the task ID to the userDetails collection, but the implementation depends on your schema
        console.log(newTask);
        const userID = newTask.admins[0];
        const updatedUser = await UserDetails.findOneAndUpdate(
            { userID: userID }, // Filter criteria to find the user
            { $push: { tasks: newTask._id } }, // Update operation to push the new task UID to the tasks array
            { new: true } // Return the updated document after the update operation
        );
        console.log(updatedUser);
        res.status(201).json({ message: 'Task created successfully' });
      } catch (error) {
        console.error('Error creating task:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
});

module.exports = router;