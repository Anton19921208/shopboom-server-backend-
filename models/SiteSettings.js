const mongoose = require('mongoose');

const siteSettingsSchema = new mongoose.Schema({
  siteEnabled: {
    type: Boolean,
    default: true,
  },
}, { collection: 'site_settings' });

module.exports = mongoose.model('SiteSettings', siteSettingsSchema); 