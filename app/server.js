require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


module.exports = {
    run: function() {
        const app = express();
        app.use(cors());
        let port = process.env.PORT || 15000;

        app.use(bodyParser.urlencoded({extended: true}));

        require('./routes')(app);

        app.listen(port, () => {
            console.log('We are live on ' + port);
        });
    }
};
