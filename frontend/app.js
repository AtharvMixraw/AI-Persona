console.log('app.js loaded successfully!');
console.log('Starting render...');

const API_URL = 'http://localhost:3000/api';

let state = {
    screen: 'landing',
    currentQuestion: 0,
    answers: {},
    persona: null,
    responseId: null
};

const QUESTIONS = [
    {
        id: 'llm',
        text: 'Which LLM do you use the most right now?',
        options: ['ChatGPT', 'Gemini', 'Claude', 'Grok', 'LLaMA (open-source)']
    },
    {
        id: 'stack',
        text: 'Where do you spend most of your dev time?',
        options: ['Frontend', 'Backend', 'ML / AI', 'DevOps / Infra', 'Exploring / Student']
    },
    {
        id: 'usage',
        text: 'How do you mostly use AI?',
        options: ['Learning concepts', 'Writing / fixing code', 'Research & experimentation', 'Building real products', 'Just trying things out']
    },
    {
        id: 'time',
        text: 'When do you code best?',
        options: ['Late night', 'Early morning', 'Fixed work hours', 'Only near deadlines']
    },
    {
        id: 'theme',
        text: 'Dark mode or light mode?',
        options: ['Dark', 'Light', 'Auto', 'Light mode at night']
    }
];

function render() {
    console.log('Rendering screen:', state.screen);
    const app = document.getElementById('app');
    
    switch(state.screen) {
        case 'landing':
            app.innerHTML = renderLanding();
            break;
        case 'quiz':
            app.innerHTML = renderQuiz();
            attachQuizListeners();
            break;
        case 'loading':
            app.innerHTML = renderLoading();
            break;
        case 'result':
            app.innerHTML = renderResult();
            attachResultListeners();
            break;
        case 'contact':
            app.innerHTML = renderContact();
            attachContactListeners();
            break;
        case 'thanks':
            app.innerHTML = renderThanks();
            break;
    }
}

function renderLanding() {
    return `
        <div class="screen landing-screen">
            <div class="landing-card">
                <div class="landing-emoji">🎯</div>
                <h1 class="landing-title">DevFest AI Summit</h1>
                <p class="landing-subtitle">Discover your AI developer persona in 30 seconds</p>
                <button class="btn-primary" onclick="startQuiz()">
                    Start Quiz →
                </button>
            </div>
        </div>
    `;
}

function renderQuiz() {
    const question = QUESTIONS[state.currentQuestion];
    const progress = ((state.currentQuestion + 1) / QUESTIONS.length) * 100;
    
    return `
        <div class="screen quiz-screen">
            <div class="quiz-container">
                <div class="progress-bar">
                    <div class="progress-text">
                        <span>Question ${state.currentQuestion + 1} of ${QUESTIONS.length}</span>
                        <span>${Math.round(progress)}%</span>
                    </div>
                    <div class="progress-track">
                        <div class="progress-fill" style="width: ${progress}%"></div>
                    </div>
                </div>
                
                <div class="question-card">
                    <h2 class="question-text">${question.text}</h2>
                    <div class="options-list">
                        ${question.options.map(opt => `
                            <button class="option-btn" data-answer="${opt}">
                                ${opt}
                            </button>
                        `).join('')}
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderLoading() {
    return `
        <div class="screen loading-screen">
            <div>
                <div class="loading-emoji">✨</div>
                <h2 class="loading-title">Generating your badge...</h2>
                <p class="loading-subtitle">Almost there!</p>
            </div>
        </div>
    `;
}

function renderResult() {
    return `
        <div class="screen result-screen">
            <div class="result-card">
                <div class="result-header">
                    <div class="result-emoji">${state.persona.emoji}</div>
                    <h2 class="result-name">${state.persona.name}</h2>
                    <p class="result-desc">"${state.persona.description}"</p>
                </div>
                
                <div class="badge-preview">
                    <img src="${state.persona.badgeUrl}" alt="${state.persona.name}" class="badge-image" id="badge-img">
                </div>
                
                <div class="action-buttons">
                    <button class="btn-primary btn-download" onclick="downloadBadge()">
                        ⬇️ Download Badge
                    </button>
                    <button class="btn-primary btn-share" onclick="shareBadge()">
                        📤 Share
                    </button>
                </div>
                
                <div class="contact-cta">
                    <p class="contact-text">Want to connect with other developers?</p>
                    <button class="btn-contact" onclick="showContact()">
                        Share Contact Info
                    </button>
                    <button class="btn-skip" onclick="restart()">Skip</button>
                </div>
            </div>
        </div>
    `;
}

function renderContact() {
    return `
        <div class="screen landing-screen">
            <div class="contact-card">
                <h2 class="contact-title">Stay Connected</h2>
                <p class="contact-subtitle">Share your email or LinkedIn (optional)</p>
                
                <form id="contact-form">
                    <div class="form-group">
                        <label class="form-label">📧 Email</label>
                        <input type="email" id="email" class="form-input" placeholder="you@example.com">
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">💼 LinkedIn Profile</label>
                        <input type="url" id="linkedin" class="form-input" placeholder="linkedin.com/in/username">
                    </div>
                    
                    <button type="submit" class="btn-primary btn-submit">Submit</button>
                    <button type="button" class="btn-skip" onclick="restart()">Skip</button>
                </form>
            </div>
        </div>
    `;
}

function renderThanks() {
    return `
        <div class="screen landing-screen">
            <div class="landing-card">
                <div class="landing-emoji">🎉</div>
                <h2 class="landing-title">Thanks for participating!</h2>
                <p class="landing-subtitle">We'll be in touch soon.</p>
                <button class="btn-primary" onclick="restart()">
                    Take Quiz Again
                </button>
            </div>
        </div>
    `;
}

function attachQuizListeners() {
    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const answer = e.target.dataset.answer;
            handleAnswer(answer);
        });
    });
}

function attachResultListeners() {
    // Listeners attached via onclick in HTML
}

function attachContactListeners() {
    document.getElementById('contact-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        await saveContact();
    });
}

function startQuiz() {
    state.screen = 'quiz';
    state.currentQuestion = 0;
    state.answers = {};
    render();
}

async function handleAnswer(answer) {
    const question = QUESTIONS[state.currentQuestion];
    state.answers[question.id] = answer;
    
    if (state.currentQuestion < QUESTIONS.length - 1) {
        state.currentQuestion++;
        render();
    } else {
        await submitQuiz();
    }
}

async function submitQuiz() {
    state.screen = 'loading';
    render();
    
    try {
        const response = await fetch(`${API_URL}/submit-response`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ answers: state.answers })
        });
        
        const data = await response.json();
        
        state.persona = data.persona;
        state.responseId = data.responseId;
        state.screen = 'result';
        
        setTimeout(render, 1500);
    } catch (error) {
        console.error('Submit error:', error);
        alert('Failed to submit quiz. Please try again.');
        state.screen = 'quiz';
        render();
    }
}

function downloadBadge() {
    const link = document.createElement('a');
    link.href = state.persona.badgeUrl;
    link.download = `${state.persona.name.replace(/\s+/g, '_')}_badge.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

async function shareBadge() {
    if (navigator.share) {
        try {
            await navigator.share({
                title: `I'm a ${state.persona.name}!`,
                text: state.persona.description,
                url: window.location.href
            });
        } catch (err) {
            console.log('Share cancelled');
        }
    } else {
        alert('Share feature not available on this device');
    }
}

function showContact() {
    state.screen = 'contact';
    render();
}

async function saveContact() {
    const email = document.getElementById('email').value;
    const linkedin = document.getElementById('linkedin').value;
    
    if (!email && !linkedin) {
        alert('Please provide at least email or LinkedIn');
        return;
    }
    
    try {
        await fetch(`${API_URL}/save-contact`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                responseId: state.responseId,
                email,
                linkedin
            })
        });
        
        state.screen = 'thanks';
        render();
    } catch (error) {
        console.error('Contact save error:', error);
        alert('Failed to save contact. Please try again.');
    }
}

function restart() {
    state = {
        screen: 'landing',
        currentQuestion: 0,
        answers: {},
        persona: null,
        responseId: null
    };
    render();
}

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, calling render()');
    render();
});