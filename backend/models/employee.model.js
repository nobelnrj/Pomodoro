const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const employeeSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  email: {
    type: String,
    required: true
  },
  password: { 
    type: String, 
    required: true,
    minlength: 8
  },
  position: { 
    type: String,
    required: true
  },
  dataJoined: {
    type: Date,
    required: false
  }
}, {
  timestamps: true,
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;