const Employee = require('../models/employee');
const redis = require('redis');
const bcrypt = require('bcrypt');

const employees = {};
const client = redis.createClient();

client.connect();

client.on('connect', () => {
    console.log('connected..');
})

//function to register/save employee .
employees.saveData = async(data) => {

    try {
        const newEmployee = new Employee(data);
        const saveEmployee = newEmployee.save();
        const registerdName = await client.set('username', `${data.firstName} ${data.lastName}`);
        return true

    } catch (err) {
        console.log('Error while creating new Employee', err);
        return false;
    }
}

//function to get the employee data.
employees.getData = async(email) => {
    try {
        const empData = await Employee.findOne({ email: email });
        const size = Object.keys(empData).length;
        if (size > 0) {
            const empName = await client.get('username');
            return { success: true, result: empData, employee: `${empName}` };
        } else {
            return { success: true, result: 'No Employee found with this email' };
        }
    } catch (err) {
        return { success: false, result: 'No Employee found ' };
    }
}

//function to login the employee

employees.loginData = async(data) => {
    try {
        const getData = await Employee.findOne({ email: data.email });
        if (getData) {
            const matchpassword = await bcrypt.compare(data.password, getData.password);
            console.log(matchpassword);
            if (matchpassword) {
                return { success: true, msg: 'Logged in successfully' };
            } else {
                return { success: false, msg: 'Invalid Password' };
            }

        } else {
            return { success: false, msg: 'Invalid Email' }
        }
    } catch (err) {
        return { success: false, msg: 'Error while login' };
    }
}





module.exports = employees;