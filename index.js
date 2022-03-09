const express = require('express');
const connectToMongo = require('./database/db');
const route = require('./routes/route');
const passport = require('passport');

const app = express();
connectToMongo();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(passport.initialize());
app.use(route);




app.listen(port, () => {
    console.log(`server is running on port`, port);
});