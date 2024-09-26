import express from 'express';
import { addNewBeeper, getAllBeepers, getBeeper, updateStatus, deleteBeeper } from '../controllers/beeperController.js';
const router = express.Router();
router.route('/beepers').post(addNewBeeper);
router.route('/beepers').get(getAllBeepers);
router.route('/beepers/:id').get(getBeeper);
router.route('/beepers/:id/status').put(updateStatus);
router.route('/beepers/:id').delete(deleteBeeper);
export default router;
