require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const basicAuth = require('express-basic-auth')
const config = require('../config');

module.exports = {
    run: function() {
        const app = express();
        app.use(cors());
        app.use(express.static('web'));
        app.use(bodyParser.urlencoded({extended: true}));
        app.use(basicAuth({
            challenge: true,
            users: config.users
        }));

        let port = process.env.PORT || 15000;

        require('./routes')(app);

        app.listen(port, () => {
            console.log('We are live on ' + port);
        });
    }
};
