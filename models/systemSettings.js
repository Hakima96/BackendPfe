const mongoose = require('mongoose');

const systemSettingsSchema = new mongoose.Schema({
  settingName: { type: String, required: true },
  settingValue: { type: String, required: true }
});

systemSettingsSchema.methods.updateSetting = function(newValue) {
  // Logic for updating setting
};

module.exports = mongoose.model('SystemSettings', systemSettingsSchema);
