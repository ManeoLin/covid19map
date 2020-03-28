var moment = require('moment');
moment().format();

const chart = document.getElementById('myDiv');

function getData(jsonData, date) {
    date = prepareDate(date);
    var todayData = groupByDate(jsonData)[date];
    var totalTestResultsIncrease = todayData.map(x => nullToNaN(x['totalTestResultsIncrease']));
    return totalTestResultsIncrease
}

function updatePlot(jsonData) {
    chart.data[0].y = getData(jsonData, dateYouWant);
    Plotly.redraw(chart);
}

const states = ["AK", "AL", "AR", "AS", "AZ", "CA", "CO", "CT", "DC", "DE", "FL", "GA", "GU", "HI", "IA", "ID", "IL", "IN", "KS", "KY", "LA", "MA", "MD", "ME", "MI", "MN", "MO", "MP", "MS", "MT", "NC", "ND", "NE", "NH", "NJ", "NM", "NV", "NY", "OH", "OK", "OR", "PA", "PR", "RI", "SC", "SD", "TN", "TX", "UT", "VA", "VI", "VT", "WA", "WI", "WV", "WY"]

// From https://gist.github.com/JamieMason/0566f8412af9fe6a1d470aa1e089a752
const groupBy = key => array =>
    array.reduce((objectsByKeyValue, obj) => {
        const value = obj[key];
        objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
        return objectsByKeyValue;
    }, {});

const groupByDate = groupBy('date');

const nullToNaN = n => n === null ? NaN : n;

const parseDate = date => parseInt(moment(date).format('YYYYMMDD'));  // 20200304, etc.

const prepareDate = date => date instanceof Date ? parseDate(date) : date;

$('#datepicker').datepicker();
$('#datepicker').on('changeDate', function () {
    $('#my_hidden_input').val(
        $('#datepicker').datepicker('getFormattedDate')
    );
    dateYouWant = parseDate($('#datepicker').datepicker('getDate'));
    Plotly.d3.json('https://covidtracking.com/api/states/daily', updatePlot);
});

// Initialize
var dateYouWant = $('#datepicker').datepicker('getDate');

Plotly.d3.json('https://covidtracking.com/api/states/daily', function (jsonData) {
    var data = [{
        x: states,
        y: getData(jsonData, dateYouWant),
        type: 'bar'
    }]
    var layout = {
        xaxis: {
            tickangle: -35,
        }
    }
    Plotly.newPlot(chart, data, layout);
})
