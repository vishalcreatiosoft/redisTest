const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const Employee = require('../models/employee');
require('dotenv').config();


module.exports = (passport) => {

    let params = {
        secretOrKey: process.env.privatekey,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    }

    passport.use(new JwtStrategy(params, (jwt_payload, next) => {

        Employee.findOne({ firstName: jwt_payload.firstName }, (err, emp) => {
            if (err) {
                next(err, false);
            }
            if (emp) {
                next(null, emp);
            } else {
                next(null, false);
            }
        });

    }));

}