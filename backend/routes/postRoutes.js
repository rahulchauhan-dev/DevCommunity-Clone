import express from 'express'
const router = express.Router()
import { getPostById, getPosts, addPost, updatePost, deletePost, createPostDiscussion, getUserPosts, likePost, unlikePost, savePost, unsavePost, addReport } from '../controllers/postController.js'
import { protect } from '../middleware/authMiddlerware.js'



router.route('/').get(getPosts).post(protect, addPost)
router.route('/:id').get(getPostById).put(protect, updatePost).delete(protect, deletePost)
router.route('/byuser/:id').get(getUserPosts)
router.route('/:id/discussions').post(protect, createPostDiscussion)
router.route('/:id/like').put(protect, likePost)
router.route('/:id/unlike').put(protect, unlikePost)
router.route('/:id/save').put(protect, savePost)
router.route('/:id/unsave').put(protect, unsavePost)
router.route('/:id/report').post(addReport)







export default router