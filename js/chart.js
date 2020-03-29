const states = require('./us-states.js').states;
const misc = require('./misc.js');
const groupByDate = misc.groupByDate;
const nullToNaN = misc.nullToNaN;
const prepareDate = misc.prepareDate;

const chart = document.getElementById('myDiv');

let dateYouWant = 20200328;
let property = 'totalTestResultsIncrease';

function getData(jsonData) {
    let date = prepareDate(dateYouWant);
    let todayData = groupByDate(jsonData)[date];
    return todayData.map(x => nullToNaN(x[property]));
}

function updatePlot(jsonData) {
    chart.data[0].y = getData(jsonData);
    Plotly.redraw(chart);
}

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
});

exports.updatePlot = updatePlot;
