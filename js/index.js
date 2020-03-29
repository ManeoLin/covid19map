var moment = require('moment');

const chart = document.getElementById('myDiv');

function getData(jsonData, date) {
    date = prepareDate(date);
    var todayData = groupByDate(jsonData)[date];
    return todayData.map(x => nullToNaN(x[property]));
}

function updatePlot(jsonData) {
    chart.data[0].y = getData(jsonData, dateYouWant);
    Plotly.redraw(chart);
}

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
    Plotly.d3.json('https://covidtracking.com/api/states/daily', updatePlot);
});

$('.selectpicker').selectpicker();
$('.selectpicker')
    .on('changed.bs.select', function () {
        let selectedValue = $(this).val();
        console.log(selectedValue);
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
        Plotly.d3.json('https://covidtracking.com/api/states/daily', updatePlot);
    });

// Initialize
var dateYouWant = $('#datepicker').datepicker('getDate');
var property = 'totalTestResultsIncrease';

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

var mapboxAccessToken = 'pk.eyJ1Ijoic2FuZXRvIiwiYSI6ImNrOGM4NDBqcDAzYnEzZWs5dTM3ZW1tbHAifQ.IMSzKaqsc8hFHNvPpROG6Q';
var map = L.map('map').setView([37.8, -96], 4);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=' + mapboxAccessToken, {
    id: 'mapbox/light-v9',
    // attribution: ...,
    tileSize: 512,
    zoomOffset: -1
}).addTo(map);

function getColor(d) {
    return d > 1000 ? '#800026' :
        d > 500 ? '#BD0026' :
            d > 200 ? '#E31A1C' :
                d > 100 ? '#FC4E2A' :
                    d > 50 ? '#FD8D3C' :
                        d > 20 ? '#FEB24C' :
                            d > 10 ? '#FED976' :
                                '#FFEDA0';
}

function style(feature) {
    return {
        fillColor: getColor(feature.properties.density),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}

var geojson;

function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
}

function resetHighlight(e) {
    geojson.resetStyle(e.target);
}

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}

geojson = L.geoJson(statesData, {
    style: style,
    onEachFeature: onEachFeature
}).addTo(map);