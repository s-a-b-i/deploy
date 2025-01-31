import { Router } from 'express';
import {
  addCategory,
  deleteCategory,
  getAllCategories,
  createFAQ,
  updateFAQ,
  deleteFAQ,
  changeFAQStatus
} from '../../controllers/admin/faq.controller.js';

const router = Router();

router.post('/category/add', addCategory);
router.post('/category/delete', deleteCategory);
router.post('/category/all', getAllCategories);
router.post('/faq/create', createFAQ);
router.post('/faq/update', updateFAQ);
router.post('/faq/delete', deleteFAQ);
router.post('/faq/change-status', changeFAQStatus);

export default router;