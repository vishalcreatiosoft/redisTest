const jwt = require('jsonwebtoken');
const employee = require('../models/employee');
const Employee = require('../models/employee');

const privatekey = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

const authorise = async(req, res, next) => {

    const token = req.header('authToken');
    if (!token) {
        res.status(401).json({ error: 'Please authenticate using valid token' });
    }

    try {
        const verifyEmployee = jwt.verify(token, privatekey);
        // console.log(verifyEmployee);
        //const employee = await Employee.findOne({ _id: employee._id });
        next();

    } catch (err) {
        res.status(400).json({ error: 'Please authenticate using valid token' });
    }
}


module.exports = authorise;