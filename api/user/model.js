const {Schema, model} = require('mongoose');

const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true,
        unique: true
    },
    Joining : {
        type: Date,
        default: Date.now
    }
})

const User = model('User', UserSchema)

module.exports = User