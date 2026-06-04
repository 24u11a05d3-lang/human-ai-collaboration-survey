import React, { useState } from 'react';
import SurveyForm from './components/SurveyForm';
import Dashboard from './components/Dashboard';

function App() {
  const [view, setView] = useState('survey'); // Toggle between 'survey' and 'dashboard'

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Human-AI Collaboration Research Portal</h1>
        <p>Real-Time Research Project (RTRP) Survey System</p>
        <nav className="nav-buttons">
          <button 
            className={view === 'survey' ? 'active-btn' : ''} 
            onClick={() => setView('survey')}
          >
            Take Survey
          </button>
          <button 
            className={view === 'dashboard' ? 'active-btn' : ''} 
            onClick={() => setView('dashboard')}
          >
            Research Dashboard
          </button>
        </nav>
      </header>

      <main className="main-content">
        {view === 'survey' ? <SurveyForm /> : <Dashboard />}
      </main>

      <footer className="app-footer">
        <p>&copy; 2026 RTRP - Human-AI Collaboration Study Group</p>
      </footer>
    </div>
  );
}

export default App;