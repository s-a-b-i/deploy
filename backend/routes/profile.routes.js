import express from 'express';
import { createProfile, getProfile, updateProfile, deleteProfile } from '../controllers/profile.controller.js';

const router = express.Router();

// Profile routes
router.post('/create', createProfile);
router.post('/get', getProfile);
router.put('/update/:id', updateProfile);
router.delete('/delete/:id', deleteProfile);


export default router;