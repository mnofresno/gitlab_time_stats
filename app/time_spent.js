var Client = require('node-rest-client').Client;
var config = require('../config');

module.exports = {
    total: async function (projectId, label) {
        return new Promise((resolve, reject) => {
            var client = new Client();
            var privateToken = config.access_token;
            var baseUrl = config.api_base_url;
            var projectUrl = `https://${baseUrl}/api/v4/projects/${projectId}`;
            var issuesUrl = `${projectUrl}/issues`;

            var args = {
                headers: {'Private-Token': privateToken},
                parameters: {}
            };
            if (label) {
                args.parameters.labels = label;
            }
            client.get(`${issuesUrl}`, args, function (issuesData, response) {
                if (response.statusCode !== 200) {
                    reject(response);
                    return;
                }
                var accumulated = 0;
                var timeStats = issuesData.map(x => x.time_stats);
                timeStats.forEach(x => accumulated += x.total_time_spent);
                var totalHours = accumulated / 3600;
                client.get(`${projectUrl}`, args, function (projectData) {
                    resolve({
                        total_issues: issuesData.length,
                        value: totalHours,
                        unit: 'hours',
                        project_name: projectData.name});
                });
            });
        });
    },
    notBilled: async function(projectId) {
        var total = await this.total(projectId);
        var billedResult = await this.total(projectId, config.label_billed);
        total.not_billed_value = total.value - billedResult.value;
        total.billed_value = billedResult.value;
        total.total_value = total.value;
        total.money_unit = config.money_unit;
        total.price_rate = config.price_rate;
        delete total.value;
        return total;
    }
};
