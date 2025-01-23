import express from 'express';
import { createProfile, getProfiles, getProfile, updateProfile, deleteProfile } from '../controllers/profile.controller.js';

const router = express.Router();

// Profile routes
router.post('/profiles', createProfile);
router.get('/profiles', getProfiles);
router.get('/profiles/:id', getProfile);
router.put('/profiles/:id', updateProfile);
router.delete('/profiles/:id', deleteProfile);


export default router;