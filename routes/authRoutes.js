import express from 'express';
const router = express.Router()
import authenticateUser from '../middleware/auth.js'
import { addUser, login, updateUser, getAllUsers, deleteUser } from '../controllers/authController.js';

router.route('/').get(getAllUsers)
router.route('/:id').delete(deleteUser)
router.route('/add-user').post(addUser)
router.route('/login').post(login);
router.route('/update-user').patch(authenticateUser, updateUser)
export default router; 