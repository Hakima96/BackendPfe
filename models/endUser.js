const mongoose = require('mongoose');
const User = require('./user');

const endUserSchema = new mongoose.Schema({});

endUserSchema.methods.accessService = function(serviceID) {
  // Logic for accessing service
};

endUserSchema.methods.provideFeedback = function(serviceID, feedback) {
  // Logic for providing feedback
};

module.exports = User.discriminator('EndUser', endUserSchema);
