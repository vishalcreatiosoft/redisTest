const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Employee = require('../models/employee');
const bcrypt = require('bcrypt');



const auth = () => {
    passport.use(new LocalStrategy(
        (username, password, done) => {
            console.log(username, password);
            Employee.findOne({ username: username }, (err, emp) => {

                if (err) {
                    console.log(err);
                    return done(err);
                }

                if (!emp) {
                    console.log('No employee found')
                    return done(null, false, { message: "Incorrect Username" });
                }

                if (emp.password !== password) {
                    console.log('not authenticated...');
                    return done(null, false, { message: "Incorrect password" });
                }

                if (emp.password == password) {
                    console.log('authenticated..');
                    return done(null, emp);
                }

            });

        }
    ));

    passport.serializeUser((emp, done) => {
        if (emp) {
            return done(null, emp.id);
        }
        return done(null, false);
    });

    passport.deserializeUser((id, done) => {
        Employee.findById(id, (err, emp) => {
            if (err) {
                return done(null, false);
            }
            return done(null, emp);
        });

    });


}

module.exports = auth;