const express = require('express');
const connectToMongo = require('./database/db');
const route = require('./routes/route');

const app = express();
connectToMongo();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(route);




app.listen(port, () => {
    console.log(`server is running on port`, port);
});