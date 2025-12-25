const CONSTANTS = {
    API_BASE_URL: process.env.API_URL || 'http://localhost:3000',
    BADGE_BASE_URL: '/badges',
    DB_NAME: process.env.DB_NAME || 'devfest_personas',
    PORT: process.env.PORT || 3000,
    CORS_ORIGIN: process.env.CORS_ORIGIN || '*'
  };
  
  module.exports = CONSTANTS;