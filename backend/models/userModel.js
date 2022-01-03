import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'


const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        require: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    bio: {
        type: String,
    },
    work: {
        type: String,
    },
    location: {
        type: String
    },
    avatar: {
        type: String,
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
    savedPost: [
        {
            post: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Post'
            }
        }
    ],
    date: {
        type: String,
        default: Date.now
    },
}, {
    timestamp: true
})

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}
userSchema.pre('save', async function (next) {

    if (!this.isModified('password')) {
        next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})


const User = mongoose.model('User', userSchema)


export default User