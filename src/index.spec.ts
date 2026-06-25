import { DateTime } from './index';

describe('DateTime Test', () => {
  it('should be able to instance a DateTime', () => {
    const now = new Date();
    const dateTime = new DateTime();
    expect(Math.floor(dateTime.getTimestamp() / 1000)).toBe(
      Math.floor(now.getTime() / 1000),
    );

    const dateTime2 = new DateTime('1985-06-20', '23:59:59');
    expect(DateTime.dateRegex.test(dateTime2.getToday())).toBe(true);
    expect(dateTime2.getDate()).toBe('1985-06-20');
    expect(dateTime2.getTime()).toBe('23:59:59');
    expect(dateTime2.getTimeInMinutes()).toBe(1439);
    expect(dateTime2.getYear()).toBe(1985);
    expect(dateTime2.getMonth()).toBe(6);
    expect(dateTime2.getDay()).toBe(20);
    expect(dateTime2.getWeekdayNumber()).toBe(4);
    expect(dateTime2.getWeekday()).toBe('Thu');
    expect(dateTime2.getTimestamp()).toBe(488170799000);
    expect(DateTime.utcRegex.test(dateTime2.toISOString())).toBe(true);

    dateTime2.setYear(2026);
    expect(dateTime2.getDate()).toBe('2026-06-20');
    dateTime2.setMonth(4);
    expect(dateTime2.getDate()).toBe('2026-04-20');
    dateTime2.setDay(30);
    expect(dateTime2.getDate()).toBe('2026-04-30');

    dateTime2.addYear(2);
    expect(dateTime2.getDate()).toBe('2028-04-30');
    dateTime2.subtractYear(5);
    expect(dateTime2.getDate()).toBe('2023-04-30');

    dateTime2.addMonth(2);
    expect(dateTime2.getDate()).toBe('2023-06-30');
    dateTime2.subtractMonth(6);
    expect(dateTime2.getDate()).toBe('2022-12-30');

    dateTime2.addDay(2);
    expect(dateTime2.getDate()).toBe('2023-01-01');
    dateTime2.subtractDay(1);
    expect(dateTime2.getDate()).toBe('2022-12-31');
  });

  it('should be able to make a interval', () => {
    const interval = DateTime.makeInterval('2026-06-01', '2026-06-10');
    expect(interval.length).toBe(10);
    expect(interval[0].getDate()).toBe('2026-06-01');
    expect(interval[9].getDate()).toBe('2026-06-10');
  });

  it('should be able to convert minutes to time', () => {
    const time = DateTime.minutesToTime(1164);
    expect(time).toBe('19:24');
  });

  it('should be able to convert time to minutes', () => {
    const time = DateTime.timeToMinutes('19:24');
    expect(time).toBe(1164);
  });

  it('should be able to convert minutes to hours', () => {
    const hours = DateTime.minutesToHours(168);
    expect(hours).toBe(2.8);
  });

  it('should be able to get locale date from a UTC date', () => {
    const date = DateTime.utcDateToLocale('2026-06-24T00:00:00.000Z');
    // Como no Brasil reduz 3h, a data volta um dia
    expect(date).toBe('2026-06-23');
  });

  it('should be able to get UTC date from a locale date', () => {
    const date = DateTime.localeDateToUTC('2026-06-24');
    // O horário do Brasil convertido para UTC deve somar 3h
    expect(date).toBe('2026-06-24T03:00:00.000Z');
  });

  it('should not be able to instance a DateTime with invalid date', () => {
    expect(() => {
      new DateTime('2026-13-30', '00:00:00');
    }).toThrow('Invalid date');
  });

  it('should not be able to instance a DateTime with invalid time', () => {
    expect(() => {
      new DateTime('2026-12-30', '24:00:00');
    }).toThrow('Invalid time');
  });
});
