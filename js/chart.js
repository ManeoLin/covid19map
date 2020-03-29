let misc = require('./misc.js');

let groupByDate = misc.groupByDate;
let nullToNaN = misc.nullToNaN;
let prepareDate = misc.prepareDate;

const chart = document.getElementById('myDiv');

function getData(jsonData, date, property) {
    date = prepareDate(date);
    let todayData = groupByDate(jsonData)[date - 1];
    console.log(date);
    console.log( groupByDate(jsonData)[date]);
    return todayData.map(x => nullToNaN(x[property]));
}

function updatePlot(jsonData, property) {
    chart.data[0].y = getData(jsonData, dateYouWant, property);
    Plotly.redraw(chart);
}

exports.chart = chart;
exports.getData = getData;
exports.updatePlot = updatePlot;
