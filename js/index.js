'use strict';

const prepareDate = require('./misc.js').prepareDate;
const updatePlot = require('./chart.js').updatePlot;

$('#datepicker').datepicker({
    startDate: "03/04/2020",
    endDate: "today",
    todayHighlight: true,
    todayBtn: "linked",
    defaultViewDate: "today",
});
$('#datepicker').on('changeDate', function () {
    $('#hidden_input_date').val(
        $('#datepicker').datepicker('getFormattedDate')
    );
    dateYouWant = prepareDate($('#datepicker').datepicker('getDate'));
    Plotly.d3.json('https://covidtracking.com/api/states/daily', updatePlot);
});

$('.selectpicker').selectpicker();
$('.selectpicker')
    .on('changed.bs.select', function () {
        let selectedValue = $(this).val();
        switch (selectedValue) {
            case 'increase':
                property = 'totalTestResultsIncrease';
                break;
            case 'positive':
                property = 'positive';
                break;
            case 'negative':
                property = 'negative';
                break;
            case 'pending':
                property = 'pending';
                break;
            case 'hospitalized':
                property = 'hospitalized';
                break;
            case 'death':
                property = 'death';
                break;
        }
        Plotly.d3.json('https://covidtracking.com/api/states/daily', updatePlot);
    });

// Initialize
let dateYouWant = $('#datepicker').datepicker('getDate');
let property = 'totalTestResultsIncrease';

exports.dateYouWant = dateYouWant;
exports.property = property;