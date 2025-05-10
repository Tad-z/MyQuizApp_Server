import express from 'express';
import { createQuiz, getAllQuizzes, getQuiz, submitQuiz } from '../controllers/quiz';

const router = express.Router();

// POST /admin/quizzes
router.post('/create', createQuiz);
router.post('/:id/submit', submitQuiz)
router.get('/get/:id', getQuiz);
router.get('/', getAllQuizzes)

export default router;
