import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { findInfluencers, getInfluencers } from '../controllers/influencerController.js';
import { deleteInfluencer } from '../controllers/influencerController.js';

const router = express.Router();

router.post('/find', protect, findInfluencers);
router.get("/getinfluencers", protect, getInfluencers)
router.delete("/deleteinfluencer", protect, deleteInfluencer)

export default router;
