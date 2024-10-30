const mongoose = require('mongoose');
const User = require('./user');

const adminSchema = new mongoose.Schema({
  adminLevel: { type: Number, required: true }
});

adminSchema.methods.createUserService = function(user) {
  // Logic for creating user service
};

adminSchema.methods.deleteUser = function(userID) {
  // Logic for deleting a user
};

adminSchema.methods.configureSystemSettings = function(settings) {
  // Logic for configuring system settings
};

module.exports = User.discriminator('Admin', adminSchema);
