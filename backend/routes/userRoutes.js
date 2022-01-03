import express from 'express'
const router = express.Router()
import { authUser, getUserProfile, registerUser, updateUserProfile, getMyPosts, savedPost } from '../controllers/userController.js'
import { protect } from '../middleware/authMiddlerware.js'

router.route('/').post(registerUser)
router.post('/login', authUser)
router.route('/myposts').get(protect, getMyPosts)
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)
router.route('/:id/saved').get(protect, savedPost)



export default router