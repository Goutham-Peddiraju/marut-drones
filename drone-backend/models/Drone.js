//drone-model

const mongoose = require('mongoose');

const droneSchema = new mongoose.Schema({
  droneName: {
    type: String,
    required: true,
    trim: true
  },
  totalDuration: { 
    type: Number, 
    required: true,
    min: 0
  },
  pilotName: {
    type: String,
    required: true,
    trim: true
  },
  location:{
    type:String,
    required:true,
    trim:true
  }
});

module.exports = mongoose.model('Drone', droneSchema);
