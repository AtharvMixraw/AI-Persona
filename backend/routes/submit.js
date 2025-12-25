const express = require('express');
const router = express.Router();
const personaService = require('../services/persona');
const badgeService = require('../services/badge');
const db = require('../db/client');
const { validateQuizAnswers } = require('../utils/validators');

router.post('/submit-response', async (req, res) => {
  try {
    const { answers } = req.body;

    // Validate input
    const validation = validateQuizAnswers(answers);
    if (!validation.valid) {
      return res.status(400).json({ error: validation.error });
    }

    // Determine persona
    const persona = personaService.determinePersona(answers);

    // Get badge URL
    const badgeUrl = badgeService.getBadgeUrl(persona.badge);

    // Store response in database
    const responseId = await db.storeQuizResponse(answers, persona);

    // Return result
    res.json({
      success: true,
      responseId,
      persona: {
        id: persona.id,
        name: persona.name,
        emoji: persona.emoji,
        description: persona.description,
        badgeUrl
      }
    });

  } catch (error) {
    console.error('Submit error:', error);
    res.status(500).json({ error: 'Failed to process quiz response' });
  }
});

module.exports = router;