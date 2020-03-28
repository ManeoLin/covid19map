var moment = require('moment');
moment().format();

Plotly.d3.json('https://covidtracking.com/api/states/daily', function (jsonData) {
    var groupByDate = groupBy('date');
    const today = parseInt(moment().format('YYYYMMDD'));  // 20200304, etc.
    var todayData = groupByDate(jsonData)[20200305];
    var totalTestResultsIncrease = todayData.map(x => nullToNaN(x['totalTestResultsIncrease']));
    console.log(totalTestResultsIncrease);
    var data = [{
        x: states,
        y: totalTestResultsIncrease,
        type: 'bar'
    }]
    var layout = {
        xaxis: {
            tickangle: -35,
        }
    }
    Plotly.newPlot('myDiv', data, layout);
})

const states = ["AK", "AL", "AR", "AS", "AZ", "CA", "CO", "CT", "DC", "DE", "FL", "GA", "GU", "HI", "IA", "ID", "IL", "IN", "KS", "KY", "LA", "MA", "MD", "ME", "MI", "MN", "MO", "MP", "MS", "MT", "NC", "ND", "NE", "NH", "NJ", "NM", "NV", "NY", "OH", "OK", "OR", "PA", "PR", "RI", "SC", "SD", "TN", "TX", "UT", "VA", "VI", "VT", "WA", "WI", "WV", "WY"]

// From https://gist.github.com/JamieMason/0566f8412af9fe6a1d470aa1e089a752
const groupBy = key => array =>
    array.reduce((objectsByKeyValue, obj) => {
        const value = obj[key];
        objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
        return objectsByKeyValue;
    }, {});

const nullToNaN = n => n === null ? NaN : n;
