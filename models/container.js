const mongoose = require('mongoose');
const Resource = require('./resource');

const containerSchema = new mongoose.Schema({
  containerID: { type: String, required: true, unique: true },
  imageName: { type: String, required: true },
  resourceLimits: { type: mongoose.Schema.Types.ObjectId, ref: 'Resource' }
});

containerSchema.methods.deployContainer = function() {
  // Logic for deploying container
};

containerSchema.methods.removeContainer = function() {
  // Logic for removing container
};

module.exports = mongoose.model('Container', containerSchema);
