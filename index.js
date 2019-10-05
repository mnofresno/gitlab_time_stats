var Client = require('node-rest-client').Client;
var config = require('./config');

var client = new Client();

var privateToken = config.access_token;
var baseUrl = config.api_base_url;
var url = `https://${baseUrl}/api/v4/projects/3/issues?private_token=${privateToken}`;

client.get(url, function (data, response) {
    var accumulated = 0;    
    var timeStats = data.map(x => x.time_stats);
    timeStats.forEach(x => accumulated += x.total_time_spent);
    console.log('total hours: '+accumulated / 3600);    
});

