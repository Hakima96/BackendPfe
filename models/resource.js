const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
  type: { type: String, required: true },
  quantity: { type: Number, required: true }
});

resourceSchema.methods.allocate = function(amount) {
  // Logic for allocating resource
};

resourceSchema.methods.release = function(amount) {
  // Logic for releasing resource
};

module.exports = mongoose.model('Resource', resourceSchema);
