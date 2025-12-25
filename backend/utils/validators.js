const QUESTIONS = require('../../config/questions');

function validateQuizAnswers(answers) {
  if (!answers || typeof answers !== 'object') {
    return { valid: false, error: 'Invalid answers format' };
  }

  // Check all required questions are answered
  for (const question of QUESTIONS) {
    if (!answers[question.id]) {
      return { valid: false, error: `Missing answer for: ${question.id}` };
    }

    // Validate answer is from valid options
    if (!question.options.includes(answers[question.id])) {
      return { valid: false, error: `Invalid answer for: ${question.id}` };
    }
  }

  return { valid: true };
}

function validateContact(contact) {
  const { email, linkedin } = contact;

  // At least one must be provided
  if (!email && !linkedin) {
    return { valid: false, error: 'Email or LinkedIn is required' };
  }

  // Validate email format if provided
  if (email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { valid: false, error: 'Invalid email format' };
    }
  }

  // Validate LinkedIn URL if provided
  if (linkedin) {
    const linkedinRegex = /linkedin\.com\/(in|company)\//;
    if (!linkedinRegex.test(linkedin)) {
      return { valid: false, error: 'Invalid LinkedIn URL format' };
    }
  }

  return { valid: true };
}

module.exports = {
  validateQuizAnswers,
  validateContact
};