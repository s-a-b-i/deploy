import express from 'express';
import { getAllPromos,createPromo, getPromos, getPromo, updatePromo, deletePromo } from '../controllers/promo.controller.js';

const router = express.Router();

router.get('/get-all', getAllPromos);

router.post('/', createPromo);
router.post('/getPromos', getPromos);
router.get('/:id', getPromo);
router.put('/:id', updatePromo);
router.delete('/:id', deletePromo);

export default router;