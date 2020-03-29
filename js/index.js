'use strict';

const states = require('./us-states.js').states;
const prepareDate = require('./misc.js').prepareDate;
const chartjs = require('./chart.js');
const getData = chartjs.getData;
const updatePlot = chartjs.updatePlot;

const dp = $('#datepicker');
const sp = $('.selectpicker');

dp.datepicker({
    startDate: "03/04/2020",
    endDate: "today",
    todayHighlight: true,
    todayBtn: "linked",
    defaultViewDate: "today",
});
dp.datepicker().on('changeDate', function () {
    $('#hidden_input_date').val(
        dp.datepicker('getFormattedDate')
    );
    let olddate = dateYouWant;
    dateYouWant = prepareDate(dp.datepicker('getDate'));
    try {
        Plotly.d3.json('https://covidtracking.com/api/states/daily', (jsonData, date, prop) => updatePlot(jsonData, date, prop));
    } catch (error) {
        console.log("failed!");
        dp.datepicker('setDate', olddate);
    }
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
    Plotly.d3.json('https://covidtracking.com/api/states/daily', (jsonData, date, prop) => updatePlot(jsonData, date, prop));
});

// Initialize
let dateYouWant = dp.datepicker('getDate');
let property = 'totalTestResultsIncrease';

Plotly.d3.json('https://covidtracking.com/api/states/daily', function (jsonData) {
    let data = [{
        x: states,
        y: getData(jsonData, dateYouWant, property),
        type: 'bar'
    }];
    let layout = {
        xaxis: {
            tickangle: -35,
        }
    };
    Plotly.newPlot(chart, data, layout);
});
