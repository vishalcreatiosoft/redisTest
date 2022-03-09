// const jwt = require('jsonwebtoken');
// require('dotenv').config();


// const authorise = async(req, res, next) => {
//     const privatekey = process.env.privatekey;
//     const token = req.header('authToken');
//     if (!token) {
//         res.status(401).json({ error: 'Please authenticate using valid token' });
//     }

//     try {
//         const verifyEmployee = jwt.verify(token, privatekey);
//         next();

//     } catch (err) {
//         res.status(400).json({ error: 'Please authenticate using valid token' });
//     }
// }


// module.exports = authorise;