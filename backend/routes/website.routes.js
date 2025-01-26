import { Router } from 'express';
const router = Router();

// Import each function separately
import { 
    getWebsites,
    getRecentlyCreatedWebsites,
    getWebsite,
    createWebsite,
    updateWebsite,
    deleteWebsite,
    discount,
    highlightMedia,
    getWebsitesForUserNotApproved,
    getWebsitesForUserApproved
} from '../controllers/websiteController.js';


// for advertisers
router.get('/get-all', getWebsites);
router.get('/recently-created/:limit', getRecentlyCreatedWebsites);

// Place specific routes before dynamic routes
router.post('/notApproved', getWebsitesForUserNotApproved);
router.post('/approved', getWebsitesForUserApproved);

router.put('/discount/:id', discount);
router.put('/highlight/:id', highlightMedia);

// Generic CRUD routes
router.get('/:id', getWebsite);
router.post('/', createWebsite);
router.put('/:id', updateWebsite);
router.delete('/:id', deleteWebsite);

export default router;