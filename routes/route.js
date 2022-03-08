const express = require('express');
const router = new express.Router();
const empController = require('../controller/employee-controller');


router.get('/', (req, res) => {
    res.send('working from route')
});

router.post('/register', async(req, res) => {
    const data = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        mobile: req.body.mobile,
        city: req.body.city
    }


    const result = await empController.saveData(data);
    (result === true) ? res.json({ success: true, decription: "Employee created successfully" }):
        res.json({ success: false, description: "Error" });

});



module.exports = router;