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
    var timeUnit = $('#timeUnit');
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

    var updateValues = (values) => {
        timeUnit.text(values.unit);
        billedTime.text(values.billed_value);
        notBilledTime.text(values.not_billed_value);
        totalTime.text(values.total_value);
        projectName.text(values.project_name);
    };

    timeStatsForm.submit(async () => {
        showSpinner();
        try {
            var result = await update(projectNumber.val());
            updateValues(result);
            hideSpinner(false);
        } catch (e) {
            hideSpinner(true);
            alert('error updating time');
        }
    });
};
