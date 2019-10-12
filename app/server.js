require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('../config');
var basicAuth = require('basic-auth');

var auth = function(req, res, next){
    var user = basicAuth(req);
    if (user && user.name) {
        var hashToVerify = `${user.name}_${user.pass}`;
        for (var userName in config.users) {
            var pass = config.users[userName];
            var hash = `${userName}_${pass}`;
            if (hash === hashToVerify) {
                return next();
            }
        }
    }
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    return res.send(401);
}


module.exports = {
    run: function() {
        const app = express();

        app.use(cors());
        app.use(function(req, res, next){
            return auth(req, res, next);
        });
        app.use(express.static('web'));

        app.use(bodyParser.urlencoded({extended: true}));

        let port = process.env.PORT || 15000;

        require('./routes')(app);

        app.listen(port, () => {
            console.log('We are live on ' + port);
        });
    }
};
