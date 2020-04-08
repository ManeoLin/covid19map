'use strict';

const prepareDate = require('./misc.js').prepareDate;
const d3 = Plotly.d3;
const chart = require('./chart.js');
const newChart = chart.newChart;
const updateChart = chart.updateChart;
// require('./map.js');

const dp = $('#datepicker');
const sp = $('.selectpicker');

dp.datepicker({
    startDate: "03/04/2020",
    endDate: "today",
    todayHighlight: true,
    todayBtn: "linked",
});
dp.datepicker().on('changeDate', function () {
    $('#hidden_input_date').val(
        dp.datepicker('getFormattedDate')
    );
    currentDate = prepareDate(dp.datepicker('getDate'));
    d3.json('https://covidtracking.com/api/states/daily', jsonData => updateChart(jsonData, currentDate, property));
});

sp.selectpicker();
sp.on('changed.bs.select', function () {
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
    d3.json('https://covidtracking.com/api/states/daily', jsonData => updateChart(jsonData, currentDate, property));
});

// Initialize
let currentDate = prepareDate(dp.datepicker('getDate'));
let property = 'totalTestResultsIncrease';
newChart(currentDate, property);
