import asyncHandler from 'express-async-handler'
import Post from '../models/postModel.js'
import User from '../models/userModel.js'
import PostReport from '../models/postReportModal.js'


//@desc Fetch all Posts
//@route GET /api/posts
//@access Public
const getPosts = asyncHandler(async (req, res) => {

    const keyword = req.query.keyword ? {
        title: {
            $regex: req.query.keyword,
            $options: 'i'
        }
    } : {}



    const posts = await Post.find({ ...keyword }).populate('user', 'name avatar')
    res.json(posts)

})


//@desc Fetch  Post by id
//@route GET /api/posts/:id
//@access Public
const getPostById = asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id).populate('user', 'name avatar bio work location date')

    if (post) {
        res.json(post)
    }
    else {
        res.status(404)
        throw new Error('Post not Found')
    }

})


//@desc Add new Post
//@route POST /api/posts
//@access Private
const addPost = asyncHandler(async (req, res) => {

    const { user, title, body, imagelink, thumbnailName, tags } = req.body

    const post = new Post({
        user: user,
        title: title,
        desc: body,
        postImage: imagelink,
        thumbnailFileName: thumbnailName,
        tags: tags
    })

    const createdPost = await post.save()
    res.status(201).json(createdPost)

})

//@desc Update Post
//@route PUT /api/posts/:id
//@access Private
const updatePost = asyncHandler(async (req, res) => {

    const { title, body, imagelink, thumbnailName, tags } = req.body

    const post = await Post.findById(req.params.id)

    if (post) {
        post.title = title || post.title,
            post.desc = body || post.desc,
            post.postImage = imagelink || post.postImage,
            post.thumbnailFileName = thumbnailName || post.thumbnailFileName
        post.tags = tags || post.tags


        const updatedPost = await post.save()
        res.status(201).json(updatedPost)
    } else {
        res.status(404)
        throw new Error('Post not Found')
    }

})

//@desc Delete a Post
//@route DELETE /api/posts/:id
//@access Private
const deletePost = asyncHandler(async (req, res) => {

    const post = await Post.findById(req.params.id)

    if (post) {
        await post.remove()
        res.json({ message: 'Post Deleted!' })
    } else {
        res.status(404)
        throw new Error('Post not Found')
    }

})


//@desc Create new Discussion
//@route POST /api/posts/:id/discussions
//@access Private
const createPostDiscussion = asyncHandler(async (req, res) => {

    const { comment } = req.body

    const post = await Post.findById(req.params.id)

    if (post) {

        const createdComment = {
            user: req.user._id,
            name: req.user.name,
            avatar: req.user.avatar,
            text: comment
        }

        post.comments.push(createdComment)
        await post.save()
        res.status(201).json({
            message: 'Discussion Added'
        })
    } else {
        res.status(404)
        throw new Error('Post not Found')
    }

})

//@desc Fetch user all Posts
//@route GET /api/posts/byuser/:id
//@access Public
const getUserPosts = asyncHandler(async (req, res) => {

    const posts = await Post.find({ user: req.params.id })

    if (posts) {
        res.json(posts)
    }
    else {
        res.status(404)
        throw new Error('Posts not Found')
    }

})

//@desc Like Post
//@route PUT /api/posts/:id/like
//@access Private
const likePost = asyncHandler(async (req, res) => {

    const post = await Post.findById(req.params.id)

    if (post) {
        post.likes.push({ user: req.user._id })
        await post.save()
        res.json({ message: 'Post Liked!' })

    }
    else {
        res.status(404)
        throw new Error('Post not Found')
    }

})

//@desc Unlike Post
//@route PUT /api/posts/:id/unlike
//@access Private
const unlikePost = asyncHandler(async (req, res) => {

    const post = await Post.findById(req.params.id)

    if (post) {
        post.likes.pop({ user: req.user._id })
        await post.save()
        res.json({ message: 'Post Unliked!' })

    }
    else {
        res.status(404)
        throw new Error('Post not Found')
    }

})

//@desc Save Post
//@route PUT /api/posts/:id/save
//@access Private
const savePost = asyncHandler(async (req, res) => {

    const user = await User.findById(req.user._id)

    if (user) {
        user.savedPost.push({ post: req.params.id })
        await user.save()
        res.json({ message: 'Post Saved!' })

    }
    else {
        res.status(404)
        throw new Error('Post not Found')
    }

})

//@desc Unsave Post
//@route PUT /api/posts/:id/unsave
//@access Private
const unsavePost = asyncHandler(async (req, res) => {

    const user = await User.findById(req.user._id)

    if (user) {
        user.savedPost.pop({ post: req.params.id })
        await user.save()
        res.json({ message: 'Post Removed From Saved!' })

    }
    else {
        res.status(404)
        throw new Error('Post not Found')
    }

})


//@desc Add new Report Post
//@route POST /api/posts/:id/report
//@access Public
const addReport = asyncHandler(async (req, res) => {

    const { postId, userId, reportBody, reportCategory } = req.body

    const report = new PostReport({
        postId: postId,
        postedUserId: userId,
        reportCategory: reportCategory,
        reportMesaage: reportBody
    })

    await report.save()
    res.json("Post Reported")

})


export {
    getPosts, getPostById, addPost, updatePost, deletePost,
    createPostDiscussion, getUserPosts, likePost, unlikePost, savePost, unsavePost, addReport
}