'use strict';

const misc = require('./misc.js');
const groupByDate = misc.groupByDate;
const nullToNaN = misc.nullToNaN;
const prepareDate = misc.prepareDate;

const chart = document.getElementById('chart');

function getData(jsonData, date, prop) {
    date = prepareDate(date);
    let data = groupByDate(jsonData);
    if (!data.hasOwnProperty(date)) {
        throw new Error('Whoops!');
    }
    let todayData = data[date];
    return todayData.map(x => nullToNaN(x[property]));
}

function updatePlot(jsonData, date, prop) {
    try {
        chart.data[0].y = getData(jsonData, date, prop);
    } catch (error) {
        console.log("error!");
    }
    Plotly.redraw(chart);
}

exports.updatePlot = updatePlot;
exports.getData = getData;