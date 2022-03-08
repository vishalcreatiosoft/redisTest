const Employee = require('../models/employee');
const redis = require('redis');

const employees = {};
const client = redis.createClient();

client.connect();

client.on('connect', () => {
    console.log('connected..');
})


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


module.exports = employees;