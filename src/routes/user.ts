import express from 'express';
import { startQuiz } from '../controllers/user';

const router = express.Router();

// POST /admin/quizzes
router.post('/start', startQuiz);

export default router;
