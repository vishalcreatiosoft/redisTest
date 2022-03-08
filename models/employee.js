const mongoose = require('mongoose');
const { Schema } = mongoose;

const employeSchema = new Schema({
    firstName: {
        type: String,
        trim: true,
    },
    lastName: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        trim: true,
        unique: true
    },
    mobile: {
        type: Number,
        trim: true,
    },
    city: {
        type: String,
        trim: true,
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('employee', employeSchema);