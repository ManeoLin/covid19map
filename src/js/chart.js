'use strict';

const us_states = require('./us-states.js').states;
const misc = require('./misc.js');
const _ = require('underscore');

const chart = document.getElementById('chart');

function getData(jsonData, date, prop) {
    date = misc.prepareDate(date);
    let data = misc.groupByDate(jsonData);
    let currentDateData = data.hasOwnProperty(date) ? data[date] : [us_states, new Array(us_states.length).fill(null)];
    return [_.pluck(currentDateData, 'state'), _.pluck(currentDateData, prop)];
}

const chartTitle = () => `Number of tests on ${misc.dateToString()} of each state`

function newChart(currentDate, property) {
    Plotly.d3.json('https://covidtracking.com/api/states/daily', function (jsonData) {
        let [states, y] = getData(jsonData, currentDate, property);
        let data = [{
            x: states,
            y: y,
            type: 'bar'
        }];
        let layout = {
            xaxis: {
                tickangle: -35,
                title: 'states'
            },
            yaxis: {
                title: 'number of tests'
            },
            title: chartTitle(),
            barmode: 'stack'
        };
        Plotly.newPlot(chart, data, layout);
    });
}

function updateChart(jsonData, date, prop) {
    [chart.data[0].x, chart.data[0].y] = getData(jsonData, date, prop);
    chart.layout.title = chartTitle();
    Plotly.redraw(chart);
}

exports.newChart = newChart;
exports.updateChart = updateChart;
exports.getData = getData;
