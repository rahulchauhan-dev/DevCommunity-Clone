import mongoose from 'mongoose'

const postReportSchema = mongoose.Schema({

    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    },
    postedUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    reportCategory: {
        type: String,
        required: true,
    },
    reportMesaage: {
        type: String,
        required: true,
    },

    date: {
        type: String,
        default: Date.now
    },
}, {
    timestamp: true
})

const PostReport = mongoose.model('PostReport', postReportSchema)


export default PostReport