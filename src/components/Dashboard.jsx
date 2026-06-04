import React, { useState, useEffect } from 'react';

export default function Dashboard() {
  const [surveys, setSurveys] = useState([]);
  const [webInsights, setWebInsights] = useState([]);
  const [loading, setLoading] = useState(true);

  // Computed Analytics States
  const [metrics, setMetrics] = useState({
    avgTrust: 0,
    totalResponses: 0,
    experienceBreakdown: {},
    frequencyBreakdown: {}
  });

  useEffect(() => {
    const fetchResearchData = async () => {
      try {
        const surveyRes = await fetch('/api/surveys');
        const surveyData = await surveyRes.json();
        setSurveys(surveyData);
        calculateAnalytics(surveyData);

        const insightRes = await fetch('/api/web-insights');
        const insightData = await insightRes.json();
        setWebInsights(insightData.insights || []);
      } catch (error) {
        console.error("Error fetching project datasets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResearchData();
  }, []);

  // Structural Telemetry Calculator
  const calculateAnalytics = (data) => {
    if (!data || data.length === 0) return;

    let totalTrust = 0;
    const expCount = {};
    const freqCount = {};

    data.forEach(item => {
      totalTrust += Number(item.trustLevel || 0);
      expCount[item.experienceLevel] = (expCount[item.experienceLevel] || 0) + 1;
      freqCount[item.aiToolFrequency] = (freqCount[item.aiToolFrequency] || 0) + 1;
    });

    setMetrics({
      avgTrust: (totalTrust / data.length).toFixed(1),
      totalResponses: data.length,
      experienceBreakdown: expCount,
      frequencyBreakdown: freqCount
    });
  };

  if (loading) return <div className="loader">Loading dynamic research insights...</div>;

  return (
    <div className="dashboard-layout">
      
      {/* 📊 REAL-TIME METRICS BAR */}
      <div className="metrics-ribbon">
        <div className="metric-box">
          <span className="metric-value">{metrics.totalResponses}</span>
          <span className="metric-label">Total Participants</span>
        </div>
        <div className="metric-box">
          <span className="metric-value">🚀 {metrics.avgTrust} / 5</span>
          <span className="metric-label">Average AI Trust Factor</span>
        </div>
        <div className="metric-box">
          <span className="metric-value">
            {metrics.frequencyBreakdown['Daily'] || 0}
          </span>
          <span className="metric-label">Daily Power Users</span>
        </div>
      </div>

      <div className="dashboard-grid">
        
        {/* 📈 ANALYTICAL INSIGHT GENERATOR */}
        <div className="card analytics-section">
          <h2>📊 Real-Time Survey Insights</h2>
          <p className="subtitle">Algorithmic summaries computed directly from active participant entries</p>
          
          {surveys.length === 0 ? (
            <p className="fallback-text">Awaiting data streaming to compute research patterns...</p>
          ) : (
            <div className="analytics-insights-list">
              <div className="insight-card-item gold">
                <h4>🎯 Core Target Audience</h4>
                <p>
                  The primary demographic interacting with autonomous nodes identifies as{" "}
                  <strong>
                    {Object.keys(metrics.experienceBreakdown).reduce((a, b) => 
                      metrics.experienceBreakdown[a] > metrics.experienceBreakdown[b] ? a : b, "Pending"
                    )} Level
                  </strong>.
                </p>
              </div>

              <div className="insight-card-item blue">
                <h4>📉 Distribution Metrics</h4>
                <div className="distribution-row">
                  <strong>Expertise Matrix:</strong>
                  <ul>
                    {Object.entries(metrics.experienceBreakdown).map(([key, val]) => (
                      <li key={key}>{key}: {val} users ({Math.round((val/metrics.totalResponses)*100)}%)</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 🌐 GLOBAL WEB TRENDS */}
        <div className="card web-trends-section">
          <h2>📡 External Web Synthesis</h2>
          <p className="subtitle">Control metrics gathered contextually from external tech streams</p>
          <div className="insights-list">
            {webInsights.map((ins, index) => (
              <div key={index} className="insight-item">
                <strong>🔬 {ins.source}</strong>
                <p>"{ins.trend}"</p>
                <span className="tag">{ins.sentiment}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* 📄 RAW DATA REFERENCE SUBMISSION LIST */}
      <div className="card table-section">
        <h2>📋 Field Study Responses Stream</h2>
        <p className="subtitle">Raw local dataset parameters stored securely within `surveys.json`</p>
        <div className="table-wrapper">
          {surveys.length === 0 ? (
            <p>No records found in current storage array context.</p>
          ) : (
            <table className="data-table">
              <thead>
                <tr>
                  <th>Participant</th>
                  <th>Expertise</th>
                  <th>Usage Volume</th>
                  <th>Trust Index</th>
                  <th>Collaboration Context Case Study</th>
                </tr>
              </thead>
              <tbody>
                {surveys.map((s) => (
                  <tr key={s._id}>
                    <td><span className="user-badge">{s.participantName}</span></td>
                    <td>{s.experienceLevel}</td>
                    <td>{s.aiToolFrequency}</td>
                    <td>
                      <div className="trust-meter-bg">
                        <div className="trust-meter-fill" style={{width: `${(s.trustLevel / 5) * 100}%`}}></div>
                      </div>
                      <span className="trust-num">{s.trustLevel}/5</span>
                    </td>
                    <td className="task-cell">"{s.collaborationTask}"</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

    </div>
  );
}