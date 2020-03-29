'use strict';

let parseDate = require('./misc.js').parseDate;
let states = require('./us-states.js').states;
let getData = require('./chart.js').getData;
let updatePlot = require('./chart.js').updatePlot;
let chart = require('./chart.js').chart;

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
    dateYouWant = parseDate($('#datepicker').datepicker('getDate'));
    Plotly.d3.json('https://covidtracking.com/api/states/daily', x => updatePlot(x, property));
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
        Plotly.d3.json('https://covidtracking.com/api/states/daily', x => updatePlot(x, property));
    });

// Initialize
let dateYouWant = $('#datepicker').datepicker('getDate');
let property = 'totalTestResultsIncrease';

Plotly.d3.json('https://covidtracking.com/api/states/daily', function (jsonData) {
    let data = [{
        x: states,
        y: getData(jsonData, dateYouWant, property),
        type: 'bar'
    }]
    let layout = {
        xaxis: {
            tickangle: -35,
        }
    }
    Plotly.newPlot(chart, data, layout);
})
