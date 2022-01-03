import asyncHandler from 'express-async-handler'
import Post from '../models/postModel.js'
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'


//@desc Auth user & get token
//@route POST /api/users/login
//@access Public
const authUser = asyncHandler(async (req, res) => {

    const { email, password } = req.body

    const user = await User.findOne({ email: email })

    if (user && (await user.matchPassword(password))) {

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })

    } else {
        res.status(401)
        throw new Error('Invalid Email or Password')
    }

})


//@desc Register a new User
//@route POST /api/users
//@access Public
const registerUser = asyncHandler(async (req, res) => {

    const { name, gender, email, password } = req.body

    const userExist = await User.findOne({ email })

    if (userExist) {
        res.status(400)
        throw new Error('User Already Exists')
    }

    const user = await User.create({
        name,
        gender,
        email,
        password,
        avatar: `https://avatars.dicebear.com/api/${gender}/${name.split(' ')[0].toLowerCase()}.svg`
    })

    if (user) {

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            gender: user.gender,
            bio: user.bio,
            work: user.work,
            location: user.location,
            avatar: user.avatar,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid user Data')


    }

})


//@desc Get user profile
//@route GET /api/users/profile
//@access Private
const getUserProfile = asyncHandler(async (req, res) => {


    const user = await User.findById(req.user._id)

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            bio: user.bio,
            work: user.work,
            location: user.location,
            avatar: user.avatar,
            savedPost: user.savedPost
        })

    } else {
        res.status(404)
        throw new Error('User not Found')
    }


})

//@desc Update user profile
//@route PUT /api/users/profile
//@access Private
const updateUserProfile = asyncHandler(async (req, res) => {


    const user = await User.findById(req.user._id)

    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.gender = req.body.gender || user.gender
        user.bio = req.body.bio || user.bio
        user.work = req.body.work || user.work
        user.location = req.body.location || user.location

        if (req.body.password) {
            user.password = req.body.password
        }

        const updatedUser = await user.save()

        res.status(201).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            bio: updatedUser.bio,
            work: updatedUser.work,
            location: updatedUser.location,
            avatar: updatedUser.avatar,
            token: generateToken(updatedUser._id)
        })

    } else {
        res.status(404)
        throw new Error('User not Found')
    }


})


//@desc Fetch logged user all Posts
//@route GET /api/users/myposts
//@access Private
const getMyPosts = asyncHandler(async (req, res) => {
    const myposts = await Post.find({ user: req.user._id })
    res.json(myposts)

})

//@desc Fetch Saved Posts
//@route GET /api/saved
//@access Private
const savedPost = asyncHandler(async (req, res) => {

    const user = await User.findById(req.params.id).populate('savedPost.post', '_id title')

    if (user) {
        res.json(

            user.savedPost

        )

    }
    else {
        res.status(404)
        throw new Error('Posts not Found')
    }

})




export { authUser, getUserProfile, registerUser, updateUserProfile, getMyPosts, savedPost }