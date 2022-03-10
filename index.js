const express = require('express');
const connectToMongo = require('./database/db');
const route = require('./routes/route');
const passport = require('passport');
const session = require('express-session');

const app = express();
connectToMongo();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(session({ secret: 'olhosvermelhoseasenhaclassica', maxAge: null }));
app.use(passport.initialize());
app.use(passport.session());
app.use(route);




app.listen(port, () => {
    console.log(`server is running on port`, port);
});