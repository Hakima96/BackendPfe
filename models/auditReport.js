const mongoose = require('mongoose');

const auditReportSchema = new mongoose.Schema({
  reportID: { type: String, required: true, unique: true },
  findings: { type: String, required: true }
});

auditReportSchema.methods.generateReport = function() {
  // Logic for generating report
};

module.exports = mongoose.model('AuditReport', auditReportSchema);
