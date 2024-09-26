import express from 'express';
import { addNewBeeper, getAllBeepers, getBeeper } from '../controllers/beeperController.js';
const router = express.Router();
router.route('/beepers').post(addNewBeeper);
router.route('/beepers').get(getAllBeepers);
router.route('/beepers/:id').get(getBeeper);
export default router;
