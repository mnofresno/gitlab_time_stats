var timeSpent = require('./time_spent');

module.exports = function(app) {
    app.get('/api/projects/:id/total_time/:label?', async (req, res) => {
        try {
            var result = await timeSpent.total(req.params.id, req.params.label);
            res.json(result);
        } catch (e) {
            res.statusCode = e.statusCode;
            res.json({message: e.statusMessage + ' replied from ' + e.responseUrl });
        }
    });
    app.get('/api/projects/:id/not_billed_time', async (req, res) => {
        try {
            var result = await timeSpent.notBilled(req.params.id);
            res.json(result);
        } catch (e) {
            res.statusCode = e.statusCode
                ? e.statusCode
                : 500;
            res.json({message: e.statusMessage + ' replied from ' + e.responseUrl });
        }
    });
};

process.on('uncaughtException', function (err) {
    console.log(err);
});
