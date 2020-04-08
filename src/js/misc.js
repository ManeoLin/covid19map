'use strict';

const moment = require('moment');

const dp = $('#datepicker');

// From https://gist.github.com/JamieMason/0566f8412af9fe6a1d470aa1e089a752
const groupBy = key => array =>
    array.reduce((objectsByKeyValue, obj) => {
        const value = obj[key];
        objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
        return objectsByKeyValue;
    }, {});

const groupByDate = groupBy('date');

const parseDate = date => parseInt(moment(date).format('YYYYMMDD'));  // 20200304, etc.

const prepareDate = date => date instanceof Date ? parseDate(date) : date;

const dateToString = () => moment(dp.datepicker('getDate')).format('LL');

exports.groupByDate = groupByDate;
exports.prepareDate = prepareDate;
exports.dateToString = dateToString;
