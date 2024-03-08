"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var datetime_1 = require("datetime");
function dateToString(date) {
    return date
        .toLocaleDateString('ja', {
        month: '2-digit',
        year: 'numeric',
        day: '2-digit',
    })
        .split('/')
        .join('-');
}
var date = '2024-03-02';
var time = '15:45:15';
var datetime = new datetime_1.DateTime(date, time);
console.log('Test 1 => ', datetime.getDate() === date);
var today = new Date();
console.log('Test 2 => ', dateToString(today) === datetime.getToday());
console.log('Test 3 => ', datetime.getTime() === time);
console.log('Test 4', datetime_1.DateTime.timeToMinutes('15:45') === 945);
