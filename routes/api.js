import express from 'express';
import { submitSurvey, getSurveyResults } from '../controllers/surveyController.js';
import { getWebInsights } from '../controllers/insightController.js';

const router = express.Router();

router.post('/survey', submitSurvey);
router.get('/surveys', getSurveyResults);
router.get('/web-insights', getWebInsights);

export default router;