const mongoose = require('mongoose');

const tasksDetailsSchema = new mongoose.Schema({
    title: String,
    description: String,
    deadline: Date,
    resources: String,
    updates: [{ user: { type: String }, update: String }],
    users: [String],
    admins: [String],
    status: { 
      type: String, 
      enum: ['pending', 'finished'], // Only allow 'pending' or 'finished'
      default: 'pending' 
    },
    priority: { 
      type: String, 
      enum: ['normal', 'high'], // Only allow 'normal' or 'high'
      default: 'normal' 
    },
    category: String
  });
  

const TasksDetails = mongoose.model('TasksDetails', tasksDetailsSchema);

module.exports = TasksDetails;
