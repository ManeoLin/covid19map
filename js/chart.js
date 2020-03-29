'use strict';

const misc = require('./misc.js');
const groupByDate = misc.groupByDate;
const nullToNaN = misc.nullToNaN;
const prepareDate = misc.prepareDate;

const chart = document.getElementById('chart');

function getData(jsonData, date, prop) {
    date = prepareDate(date);
    let data = groupByDate(jsonData);
    if (data.hasOwnProperty(date)) {
        let todayData = data[date];
        return todayData.map(x => nullToNaN(x[prop]));
    }
    return null;
}

function updatePlot(jsonData, date, prop) {
    let data = getData(jsonData, date, prop);
    if (data !== null) {
        chart.data[0].y = getData(jsonData, date, prop);
        Plotly.redraw(chart);
    }
}

exports.updatePlot = updatePlot;
exports.getData = getData;
exports.chart = chart;
