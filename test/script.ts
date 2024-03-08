import { DateTime } from 'datetime';

function dateToString(date: Date): string {
  return date
    .toLocaleDateString('ja', {
      month: '2-digit',
      year: 'numeric',
      day: '2-digit',
    })
    .split('/')
    .join('-');
}

const date = '2024-03-02';
const time = '15:45:15';

const datetime = new DateTime(date, time);

console.log('Test 1 => ', datetime.getDate() === date);

const today = new Date();

console.log('Test 2 => ', dateToString(today) === datetime.getToday());

console.log('Test 3 => ', datetime.getTime() === time);

console.log('Test 4 => ', DateTime.timeToMinutes('15:45') === 945);
