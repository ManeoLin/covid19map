'use strict';

const moment = require('moment');

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

exports.groupByDate = groupByDate;
exports.nullToNaN = nullToNaN;
exports.prepareDate = prepareDate;
