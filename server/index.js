'use strict';
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./config');
const complainRoutes=require('./routes/complains');
const app = express()

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use('/api',complainRoutes.routes)





app.listen(config.port, () => {
    console.log("Baladia app is running on url: http://localhost:"+config.port);
})