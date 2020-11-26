const { text } = require('body-parser');

const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

let userSchema = new Schema({
    name: {
        type: String,
        default: '',
    },
    gender: {
        type: String,
        default: ''
    },
    mobile: {
        type: Number,
        unique: true
    },
    email: {
        type: String,
        unique: true
    },
    designation: {
        type: String,
        default: 'S'
    },
    password: {
        type: String,
        default: 'passuser'
    }
})

mongoose.model('User', userSchema);