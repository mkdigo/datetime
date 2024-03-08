export class DateTime {
  private today: Date;
  private date: Date;
  private dateRegex: RegExp;
  private timeRegex: RegExp;

  /**
   *
   * @param date string (Example: 2024-03-08)
   * @param time string (Example: 15:45:00)
   */
  constructor(date: string | null = null, time: string | null = null) {
    this.today = new Date();

    this.dateRegex = new RegExp(/\d{4}-\d{2}-\d{2}/);

    if (!date || !this.dateRegex.test(date)) {
      date = this.today
        .toLocaleDateString('ja', {
          month: '2-digit',
          year: 'numeric',
          day: '2-digit',
        })
        .split('/')
        .join('-');
    }

    this.timeRegex = new RegExp(/\d{2}:\d{2}:\d{2}/);
    if (!time || !this.timeRegex.test(time))
      time = this.today.toLocaleTimeString();

    this.date = new Date(`${date}T${time}`);
  }

  getToday() {
    return this.today
      .toLocaleDateString('ja', {
        month: '2-digit',
        year: 'numeric',
        day: '2-digit',
      })
      .split('/')
      .join('-');
  }

  getDate() {
    return this.date
      .toLocaleDateString('ja', {
        month: '2-digit',
        year: 'numeric',
        day: '2-digit',
      })
      .split('/')
      .join('-');
  }

  getTime() {
    return this.date.toLocaleTimeString('ja', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  }

  getTimeInMinutes() {
    const [hours, minutes] = this.getTime().split(':');
    return Number(hours) * 60 + Number(minutes);
  }

  getYear() {
    return this.date.getFullYear();
  }

  setYear(n: number) {
    if (!isNaN(n)) this.date.setFullYear(n);
  }

  addYear(n: number) {
    if (!isNaN(n)) this.date.setFullYear(this.date.getFullYear() + n);
  }

  subtractYear(n: number) {
    if (!isNaN(n)) this.date.setFullYear(this.date.getFullYear() - n);
  }

  getMonth() {
    return this.date.getMonth() + 1;
  }

  setMonth(n: number) {
    if (!isNaN(n)) this.date.setMonth(n - 1);
  }

  addMonth(n: number) {
    if (!isNaN(n)) this.date.setMonth(this.date.getMonth() + n);
  }

  subtractMonth(n: number) {
    if (!isNaN(n)) this.date.setMonth(this.date.getMonth() - n);
  }

  getDay() {
    return this.date.getDate();
  }

  setDay(n: number) {
    if (!isNaN(n)) this.date.setDate(n);
  }

  addDay(n: number) {
    if (!isNaN(n)) this.date.setDate(this.date.getDate() + n);
  }

  subtractDay(n: number) {
    if (!isNaN(n)) this.date.setDate(this.date.getDate() - n);
  }

  getWeekday() {
    return this.date.getDay();
  }

  makeInterval(endDate: string): DateTime[] {
    if (!this.dateRegex.test(endDate) || this.getDate() >= endDate) return [];

    const date = new DateTime(this.getDate());

    const interval: DateTime[] = [new DateTime(date.getDate())];

    while (date.getDate() < endDate) {
      date.addDay(1);
      interval.push(new DateTime(date.getDate()));
    }

    return interval;
  }

  public static getAge(birthdate: string | undefined): number {
    if (!birthdate) return 0;

    const birthdateTimestamp = new Date(birthdate).getTime();

    if (isNaN(birthdateTimestamp)) return 0;

    const todayTimestamp = new Date().getTime();
    const diff = new Date(todayTimestamp - birthdateTimestamp).getFullYear();

    return diff - 1970;
  }

  public static minutesToTime(minutes: number): string {
    const h = Math.floor(minutes / 60)
      .toString()
      .padStart(2, '0');
    const m = (minutes % 60).toString().padStart(2, '0');

    return `${h}:${m}`;
  }

  /**
   *
   * @param time string (Example: 15:45 -> hh:mm)
   * @returns number
   */
  public static timeToMinutes(time: string): number {
    const regex = /\d{2}:\d{2}/g;

    if (!regex.test(time)) return 0;

    const [h, m] = time.split(':');

    return Number(h) * 60 + Number(m);
  }

  public static minutesToHours(minutes: number): number {
    return Math.round((minutes / 60 + Number.EPSILON) * 100) / 100;
  }
}
