import fs from 'fs';
import path from 'path';

const FILE_PATH = path.resolve('./surveys.json');

// Helper to read data from local JSON file safely
const readData = () => {
  if (!fs.existsSync(FILE_PATH)) return [];
  try {
    const data = fs.readFileSync(FILE_PATH, 'utf8');
    return JSON.parse(data || '[]');
  } catch (err) {
    console.error("Error reading storage file, resetting:", err);
    return [];
  }
};

export const submitSurvey = async (req, res) => {
  try {
    const existingData = readData();
    
    const newResponse = {
      _id: Date.now().toString(), // Mock unique ID string
      participantName: req.body.participantName || 'Anonymous',
      experienceLevel: req.body.experienceLevel,
      aiToolFrequency: req.body.aiToolFrequency,
      trustLevel: Number(req.body.trustLevel),
      collaborationTask: req.body.collaborationTask,
      submittedAt: new Date()
    };

    existingData.unshift(newResponse); // Add new entries to the top
    fs.writeFileSync(FILE_PATH, JSON.stringify(existingData, null, 2));

    res.status(201).json({ success: true, message: 'Survey response saved to local JSON storage!' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getSurveyResults = async (req, res) => {
  try {
    const data = readData();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};