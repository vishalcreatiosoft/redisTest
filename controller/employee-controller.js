const Employee = require('../models/employee');

const employees = {};

employees.saveData = async(data) => {

    try {
        const newEmployee = new Employee(data);
        const saveEmployee = newEmployee.save();
        return true

    } catch (err) {
        console.log('Error while creating new Employee', err);
        return false;
    }
}


module.exports = employees;