CREATE DATABASE devfest_personas;

\c devfest_personas;

-- Quiz responses table
CREATE TABLE quiz_responses (
    id SERIAL PRIMARY KEY,
    llm_choice VARCHAR(50),
    tech_stack VARCHAR(50),
    ai_usage VARCHAR(100),
    coding_time VARCHAR(50),
    theme_preference VARCHAR(50),
    persona_id INTEGER,
    persona_name VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Contact info table
CREATE TABLE contact_info (
    id SERIAL PRIMARY KEY,
    response_id INTEGER REFERENCES quiz_responses(id),
    email VARCHAR(255),
    linkedin VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX idx_quiz_responses_created_at ON quiz_responses(created_at);
CREATE INDEX idx_quiz_responses_persona_id ON quiz_responses(persona_id);
CREATE INDEX idx_contact_info_response_id ON contact_info(response_id);

-- Analytics view
CREATE VIEW persona_stats AS
SELECT 
    persona_name,
    COUNT(*) as total_count,
    COUNT(DISTINCT c.id) as with_contact_count
FROM quiz_responses q
LEFT JOIN contact_info c ON q.id = c.response_id
GROUP BY persona_name
ORDER BY total_count DESC;