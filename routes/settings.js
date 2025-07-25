const express = require('express');
const router = express.Router();
const SiteSettings = require('../models/SiteSettings');

// Получить статус сайта
router.get('/', async (req, res) => {
  try {
    let settings = await SiteSettings.findOne();
    if (!settings) {
      settings = await SiteSettings.create({ siteEnabled: true });
    }
    res.json({ siteEnabled: settings.siteEnabled });
  } catch (e) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Изменить статус сайта
router.put('/', async (req, res) => {
  try {
    const { siteEnabled } = req.body;
    let settings = await SiteSettings.findOne();
    if (!settings) {
      settings = await SiteSettings.create({ siteEnabled });
    } else {
      settings.siteEnabled = siteEnabled;
      await settings.save();
    }
    res.json({ siteEnabled: settings.siteEnabled });
  } catch (e) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router; 