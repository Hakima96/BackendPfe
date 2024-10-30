const mongoose = require('mongoose');
const User = require('./user');

const webServiceDeveloperSchema = new mongoose.Schema({});

webServiceDeveloperSchema.methods.deployService = function(container) {
  // Logic for deploying service
};

webServiceDeveloperSchema.methods.migrateService = function(serviceID, targetEnvironment) {
  // Logic for migrating service
};

webServiceDeveloperSchema.methods.updateService = function(service) {
  // Logic for updating service
};

module.exports = User.discriminator('WebServiceDeveloper', webServiceDeveloperSchema);
