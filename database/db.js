const mongoose = require('mongoose');

const mongoURI = 'mongodb://127.0.0.1:27017/redisTest';

const connectToMongo = () => {
    mongoose.connect(mongoURI, () => {
        console.log('mongodb connected');
    });
}


module.exports = connectToMongo;