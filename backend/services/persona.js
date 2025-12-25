const PERSONAS = require('../../config/personas');

function normalizeAnswers(answers) {
  const stack = answers.stack || 'Backend';
  
  const time = answers.time === 'Early morning' ? 'Morning' : 
               answers.time === 'Fixed work hours' ? 'Work hours' :
               answers.time === 'Only near deadlines' ? 'Deadline' : 'Late night';
  
  const theme = answers.theme === 'Light mode at night' ? 'Auto' : answers.theme;
  
  return { stack, time, theme };
}

function determinePersona(answers) {
  const { stack, time, theme } = normalizeAnswers(answers);
  const key = `${stack}-${time}-${theme}`;
  
  // Return matching persona or fallback
  return PERSONAS[key] || PERSONAS['Backend-Late night-Dark'];
}

module.exports = {
  determinePersona,
  normalizeAnswers
};