import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { findInfluencers } from '../controllers/influencerController.js';

const router = express.Router();

router.post('/find', protect, findInfluencers);

export default router;
