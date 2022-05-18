import express from 'express';
const router = express.Router()
import authenticateUser from '../middleware/auth.js'
import { addUser, login, updateUser,getAllUsers } from '../controllers/authController.js';

router.route('/add-user').post(addUser)
router.route('/login').post(login);
router.route('/update-user').patch(authenticateUser, updateUser)
router.route('/get-all-users').get(getAllUsers)
export default router; 