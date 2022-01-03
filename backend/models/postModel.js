import mongoose from 'mongoose'

const postSchema = mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    title: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    postImage: {
        type: String,
    },
    thumbnailFileName: {
        type: String,
    },
    likes:
        [
            {
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'User'
                }
            }
        ],
    comments: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            text: {
                type: String,
                required: true
            },
            name: {
                type: String,
            },
            avatar: {
                type: String,
            },
            date: {
                type: Date,
                default: Date.now
            }
        }
    ],
    tags: {
        type: String,
    },
    date: {
        type: String,
        default: Date.now
    },
}, {
    timestamp: true
})

const Post = mongoose.model('Post', postSchema)


export default Post