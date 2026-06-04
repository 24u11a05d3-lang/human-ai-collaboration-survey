import React, { useState } from 'react';

export default function SurveyForm() {
  const [formData, setFormData] = useState({
    participantName: '',
    experienceLevel: 'Intermediate',
    aiToolFrequency: 'Daily',
    trustLevel: 3,
    collaborationTask: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: 'loading', message: 'Submitting your responses...' });

    try {
      const response = await fetch('http://localhost:5000/api/survey', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        setStatus({ type: 'success', message: 'Survey submitted successfully! Thank you for your contribution.' });
        setFormData({
          participantName: '',
          experienceLevel: 'Intermediate',
          aiToolFrequency: 'Daily',
          trustLevel: 3,
          collaborationTask: ''
        });
      } else {
        setStatus({ type: 'error', message: 'Failed to submit: ' + data.error });
      }
    } catch (err) {
      setStatus({ type: 'error', message: 'Could not connect to the backend server.' });
    }
  };

  return (
    <div className="card">
      <h2>User Insights Survey</h2>
      <p>Your input provides critical data parameters for evaluating human cognitive placement alongside autonomous agents.</p>
      
      {status.message && (
        <div className={`status-banner ${status.type}`}>
          {status.message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="survey-form">
        <label>
          Participant Name / ID (Optional):
          <input 
            type="text" 
            name="participantName" 
            value={formData.participantName} 
            onChange={handleChange} 
            placeholder="Anonymous"
          />
        </label>

        <label>
          Your Tech/AI Expertise Experience Level:
          <select name="experienceLevel" value={formData.experienceLevel} onChange={handleChange}>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Expert">Expert</option>
          </select>
        </label>

        <label>
          How frequently do you leverage AI tools in your workflow?
          <select name="aiToolFrequency" value={formData.aiToolFrequency} onChange={handleChange}>
            <option value="Daily">Daily</option>
            <option value="Weekly">Weekly</option>
            <option value="Rarely">Rarely</option>
          </select>
        </label>

        <label>
          Trust Factor towards Generative AI outputs (1 = Very Low, 5 = Absolute Trust):
          <input 
            type="range" 
            name="trustLevel" 
            min="1" 
            max="5" 
            value={formData.trustLevel} 
            onChange={handleChange}
          />
          <span className="range-indicator">Selected Level: {formData.trustLevel}</span>
        </label>

        <label>
          Describe a brief scenario where you successfully or unsuccessfully collaborated with an AI agent:
          <textarea 
            name="collaborationTask" 
            value={formData.collaborationTask} 
            onChange={handleChange} 
            required 
            placeholder="e.g., I used code generation to refactor a WebGL context handler, but had to correct its coordinate math..."
          />
        </label>

        <button type="submit" className="submit-btn">Submit Survey Responses</button>
      </form>
    </div>
  );
}