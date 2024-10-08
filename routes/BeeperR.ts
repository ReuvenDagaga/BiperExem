import express, { Router } from 'express';
import { addNewBeeper, getAllBeepers, getBeeper, updateStatus, deleteBeeper, getBeepersByStatus } from '../controllers/beeperController.js';


const router: Router = express.Router();

router.route('/beepers').post(addNewBeeper);
router.route('/beepers').get(getAllBeepers);
router.route('/beepers/:id').get(getBeeper);
router.route('/beepers/:id/status').put(updateStatus);
router.route('/beepers/:id').delete(deleteBeeper);
router.route('/beepers/status/:status').get(getBeepersByStatus);






export default router;