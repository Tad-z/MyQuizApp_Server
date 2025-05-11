import User from '../models/user';
import { Request, Response } from 'express';

function isValidEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

export const startQuiz = async (req: Request, res: Response) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: 'Name and email are required' });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }

  try {
    const existingUser = await User.findOne({ email });
    const user = existingUser || await User.create({ name, email });

    res.status(200).json({ message: 'User ready', userId: user._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error starting quiz', error: err });
  }
};
