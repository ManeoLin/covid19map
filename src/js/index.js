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
    d3.json('https://covidtracking.com/api/states/daily', jsonData => updateChart(jsonData, currentDate, properties));
});

sp.selectpicker();
sp.on('changed.bs.select', function () {
    let selectedValues = $(this).val();
    for (const selectedValue of selectedValues) {
        switch (selectedValue) {
            case 'increase':
                properties.push('totalTestResultsIncrease');
                break;
            case 'positive':
                properties.push('positive');
                break;
            case 'negative':
                properties.push('negative');
                break;
            case 'pending':
                properties.push('pending');
                break;
            case 'hospitalized':
                properties.push('hospitalized');
                break;
            case 'death':
                properties.push('death');
                break;
        }
    }
    d3.json('https://covidtracking.com/api/states/daily', jsonData => updateChart(jsonData, currentDate, properties));
});

// Initialize
let currentDate = prepareDate(dp.datepicker('getDate'));
let properties = ['totalTestResultsIncrease'];
newChart(currentDate, properties);
