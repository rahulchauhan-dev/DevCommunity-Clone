import mongoose from 'mongoose'
import dotenv from 'dotenv'

import users from './data/users.js'
import posts from './data/posts.js'
import postReport from './data/postReport.js'

import User from './models/userModel.js'
import Post from './models/postModel.js'
import PostReport from './models/postReportModal.js'


import connectDB from './config/db.js'

dotenv.config()
connectDB()


const importData = async () => {

    try {
        // await User.deleteMany()
        // await Post.deleteMany()


        //  const createdUsers = await User.insertMany(users)

        //   const rahul = createdUsers[0]._id

        //   const samplePosts = posts.map(post => {
        //       return { ...post, user: rahul }
        //   })


        //  await Post.insertMany(samplePosts)

        await PostReport.create(postReport)

        console.log('Data Imported')
        process.exit()

    } catch (error) {

        console.error(`${error}`)
        process.exit(1)
    }
}


const destroyData = async () => {

    try {
        await User.deleteMany()
        await Post.deleteMany()


        console.log('Data Destroyed')
        process.exit()

    } catch (error) {

        console.error(`${error}`)
        process.exit(1)
    }
}

if (process.argv[2] === '-d') {
    destroyData()
} else {
    importData()
}