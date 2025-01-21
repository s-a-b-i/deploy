import { Router } from 'express';
const router = Router();

// Import each function separately
import { getWebsites } from '../controllers/websiteController.js';
import { getWebsite } from '../controllers/websiteController.js';
import { createWebsite } from '../controllers/websiteController.js';
import { updateWebsite } from '../controllers/websiteController.js';
import { deleteWebsite } from '../controllers/websiteController.js';
import { discount } from '../controllers/websiteController.js';
import { highlightMedia } from '../controllers/websiteController.js';

router.get('/', getWebsites);
router.get('/:id', getWebsite);
router.post('/', createWebsite);
router.put('/:id', updateWebsite);
router.delete('/:id', deleteWebsite);

router.put('/discount/:id', discount);
router.put('/highlight/:id', highlightMedia);

export default router;
