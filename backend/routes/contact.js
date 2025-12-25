const express = require('express');
const router = express.Router();
const db = require('../db/client');
const { validateContact } = require('../utils/validators');

router.post('/save-contact', async (req, res) => {
  try {
    const { responseId, email, linkedin } = req.body;

    // Validate input
    const validation = validateContact({ email, linkedin });
    if (!validation.valid) {
      return res.status(400).json({ error: validation.error });
    }

    if (!responseId) {
      return res.status(400).json({ error: 'Response ID is required' });
    }

    // Store contact info
    await db.storeContactInfo(responseId, { email, linkedin });

    res.json({
      success: true,
      message: 'Contact info saved successfully'
    });

  } catch (error) {
    console.error('Contact save error:', error);
    res.status(500).json({ error: 'Failed to save contact info' });
  }
});

module.exports = router;