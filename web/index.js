$(document).ready(async () => {
    app();
});

var app = function() {
    var projectNumber = $('#projectNumber');
    var projectName = $('#projectName');
    var updateButton = $('#updateButton');
    var totalTime = $('#totalTime');
    var notBilledTime = $('#notBilledTime');
    var billedTime = $('#billedTime');
    var spinnerIcon = $('#spinnerIcon');
    var updateIcon = $('#updateIcon');
    var timeStats = $('#timeStats');
    var timeStatsForm = $('#timeStatsForm');

    var showSpinner = () => {
        timeStats.hide();
        updateIcon.hide();
        spinnerIcon.show();
    };

    var hideSpinner = (error) => {
        setTimeout(() => {
            if (!error) {
                timeStats.show();
            }
            updateIcon.show();
            spinnerIcon.hide();
        }, 500);
    };

    var update = async (projectId) => {
        return await $.get(`/api/projects/${projectId}/not_billed_time`);
    };

    var setTimeValue = (target, value, values) => {
        target.text(`${value} ${values.unit} (${values.money_unit} ${values.price_rate * value})`);
    };

    var updateValues = (values) => {
        setTimeValue(billedTime, values.billed_value, values);
        setTimeValue(notBilledTime, values.not_billed_value, values);
        setTimeValue(totalTime, values.total_value, values);
        projectName.text(values.project_name);
    };

    var runUpdate = async () => {
        showSpinner();
        try {
            var result = await update(projectNumber.val());
            updateValues(result);
            hideSpinner(false);
        } catch (e) {
            hideSpinner(true);
            alert('error updating time');
        }
    };

    updateButton.click(runUpdate);
    timeStatsForm.submit((event) => {
        event.preventDefault();
        runUpdate();
    });

    var parseUrl = () => {
        var query = window.location.search;
        var parts = query.split('=');
        var lastParam = parts.slice(-1)[0];
        if (lastParam == parseInt(lastParam)) {
            projectNumber.val(parseInt(lastParam));
            runUpdate();
        }
    };

    parseUrl();
};
