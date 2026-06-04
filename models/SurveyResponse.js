import mongoose from 'mongoose';

const SurveyResponseSchema = new mongoose.Schema({
  participantName: { type: String, default: 'Anonymous' },
  experienceLevel: { type: String, required: true }, // e.g., Beginner, Intermediate, Expert
  aiToolFrequency: { type: String, required: true }, // e.g., Daily, Weekly, Rarely
  trustLevel: { type: Number, required: true, min: 1, max: 5 },
  collaborationTask: { type: String, required: true }, // Text description of how they use AI
  submittedAt: { type: Date, default: Date.now }
});

export default mongoose.model('SurveyResponse', SurveyResponseSchema);