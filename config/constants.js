const CONSTANTS = {
    API_BASE_URL: 'https://ai-persona-bes1.onrender.com',
    BADGE_BASE_URL: '/badges',
    DB_NAME: process.env.DB_NAME || 'devfest_personas',
    PORT: process.env.PORT || 3000,
    CORS_ORIGIN: process.env.CORS_ORIGIN || '*'
  };
  
  module.exports = CONSTANTS;
  