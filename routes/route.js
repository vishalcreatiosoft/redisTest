const express = require('express');
const router = new express.Router();
const empController = require('../controller/employee-controller');
const bcrypt = require('bcrypt');


// Route-1 Landing page
router.get('/', (req, res) => {
    res.send('working from route')
});

// Route 2 ##### Register Employee  
router.post('/register/employee', async(req, res) => {

    //password hashing
    const salt = bcrypt.genSaltSync(10);
    const password = bcrypt.hashSync(req.body.password, salt)
        // console.log(salt);
        // console.log(password);
    const data = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        mobile: req.body.mobile,
        city: req.body.city,
        password: password
    }

    const result = await empController.saveData(data);
    (result === true) ? res.json({ success: true, decription: "Employee created successfully" }):
        res.json({ success: false, description: "Error" });

});

// Route 3 ##### Get Employee Data 
router.get('/getEmployeeData', async(req, res) => {

    const email = req.body.email;
    const result = await empController.getData(email);
    if (result.success === true) {
        res.status(200);
        res.json(result);
    } else {
        res.status(401);
        res.json(result);
    }

});

// Route 3 ##### Login Employee 
router.get('/login', async(req, res) => {


    const data = {
        email: req.body.email,
        password: req.body.password
    }
    const result = await empController.loginData(data);
    if (result.success) {
        res.status(200);
        res.json(result);
    } else {
        res.status(401);
        res.json(result);
    }

})


module.exports = router;