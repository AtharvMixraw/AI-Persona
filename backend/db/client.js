const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'devfest_personas',
  password: process.env.DB_PASSWORD || 'postgres',
  port: process.env.DB_PORT || 5432,
});

async function storeQuizResponse(answers, persona) {
  const query = `
    INSERT INTO quiz_responses (
      llm_choice, tech_stack, ai_usage, coding_time, 
      theme_preference, persona_id, persona_name
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING id
  `;
  
  const values = [
    answers.llm,
    answers.stack,
    answers.usage,
    answers.time,
    answers.theme,
    persona.id,
    persona.name
  ];
  
  const result = await pool.query(query, values);
  return result.rows[0].id;
}

async function storeContactInfo(responseId, contact) {
  const query = `
    INSERT INTO contact_info (response_id, email, linkedin)
    VALUES ($1, $2, $3)
    RETURNING id
  `;
  
  const values = [responseId, contact.email, contact.linkedin];
  const result = await pool.query(query, values);
  return result.rows[0].id;
}

async function getPersonaStats() {
  const query = 'SELECT * FROM persona_stats';
  const result = await pool.query(query);
  return result.rows;
}

module.exports = {
  pool,
  storeQuizResponse,
  storeContactInfo,
  getPersonaStats
};