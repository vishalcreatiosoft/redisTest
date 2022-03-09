const express = require('express');
const router = new express.Router();
const empController = require('../controller/employee-controller');
const bcrypt = require('bcrypt');
const passport = require('passport');
require('../middleware/passports')(passport);
//const authorise = require('../middleware/authorise');



// Route-1 Landing page
router.get('/', (req, res) => {
    res.send('working from route');
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
router.get('/getEmployeeData', passport.authenticate('jwt', { session: false }), async(req, res) => {

    const email = req.body.email;
    const result = await empController.getData(email);
    if (result.success === true) {
        res.status(200);
        res.json(result);
    } else {
        res.status(401);
        res.json(result);
    }
    // console.log(email);
    // res.json({ success: true, result: email })
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

//Route-4 ###### About Us
router.get('/aboutUs', passport.authenticate('jwt', { session: false }), async(req, res) => {
    res.send('Creatiosoft is a global IT consulting company providing full-range QA and game development services. With 12+ years in software testing services, Creatiosoft has delivered several marquee high-quality games/applications and 300 entities across major smartphone platforms. We design and develop mobile applications and games and have tasted unparalleled success in this domain.')
        //res.json({ success: true, result: 'About us page' });
});


module.exports = router;