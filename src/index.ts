type TLanguage = 'en-US' | 'pt-BR';

export class DateTime {
  private today: Date;
  private date: Date;
  public static dateRegex: RegExp = new RegExp(
    /^\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\d|3[01])$/,
  );
  public static timeRegex: RegExp = new RegExp(
    /^(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$/,
  );
  public static utcRegex: RegExp = new RegExp(
    /^\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\d|3[01])T(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d{3})?Z$/,
  );

  constructor(date: string | null = null, time: string | null = null) {
    this.today = new Date();

    if (date && DateTime.utcRegex.test(date)) {
      this.date = new Date(date);
      return;
    }

    if (!date) date = this.dateToString(this.today);
    if (!time) time = this.timeToString(this.today);

    if (!DateTime.dateRegex.test(date)) throw new Error('Invalid date');
    if (!DateTime.timeRegex.test(time)) throw new Error('Invalid time');

    this.date = new Date(`${date}T${time}`);
  }

  private dateToString(date: Date): string {
    const year = date.getFullYear().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  private timeToString(date: Date): string {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  }

  public getToday() {
    return this.dateToString(this.today);
  }

  public getDate(): string {
    return this.dateToString(this.date);
  }

  public getTime(): string {
    return this.timeToString(this.date);
  }

  public getTimeInMinutes(): number {
    const [hours, minutes] = this.getTime().split(':');
    return Number(hours) * 60 + Number(minutes);
  }

  public getYear(): number {
    return this.date.getFullYear();
  }

  public getMonth(): number {
    return this.date.getMonth() + 1;
  }

  public getDay(): number {
    return this.date.getDate();
  }

  public getWeekdayNumber(): number {
    return this.date.getDay();
  }

  public getWeekday(language: TLanguage = 'en-US'): string {
    const weekdays: Record<TLanguage, string[]> = {
      'en-US': ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      'pt-BR': ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
    };
    return weekdays[language][this.getWeekdayNumber()];
  }

  public getTimestamp(): number {
    return this.date.getTime();
  }

  public getAge(): number {
    return DateTime.ageCalculator(this.getDate());
  }

  public toISOString() {
    return this.date.toISOString();
  }

  public setYear(year: number): void {
    if (isNaN(year) || !/^\d{4}$/.test(year.toString()))
      throw new Error('Invalid year');
    this.date.setFullYear(year);
  }

  public setMonth(month: number): void {
    if (isNaN(month) || month < 1 || month > 12)
      throw new Error('Invalid month');
    this.date.setMonth(month - 1);
  }

  public setDay(day: number): void {
    if (isNaN(day) || day < 1 || day > 31) throw new Error('Invalid day');
    this.date.setDate(day);
  }

  public addYear(n: number): void {
    if (!isNaN(n)) this.date.setFullYear(this.date.getFullYear() + n);
  }

  public subtractYear(n: number): void {
    if (!isNaN(n)) this.date.setFullYear(this.date.getFullYear() - n);
  }

  public addMonth(n: number): void {
    if (!isNaN(n)) this.date.setMonth(this.date.getMonth() + n);
  }

  public subtractMonth(n: number): void {
    if (!isNaN(n)) this.date.setMonth(this.date.getMonth() - n);
  }

  public addDay(n: number): void {
    if (!isNaN(n)) this.date.setDate(this.date.getDate() + n);
  }

  public subtractDay(n: number): void {
    if (!isNaN(n)) this.date.setDate(this.date.getDate() - n);
  }

  clone() {
    return new DateTime(this.getDate(), this.getTime());
  }

  public static makeInterval(startDate: string, endDate: string): DateTime[] {
    if (
      !DateTime.dateRegex.test(startDate) ||
      !DateTime.dateRegex.test(endDate) ||
      startDate >= endDate
    )
      return [];

    const startDateTime = new DateTime(startDate, '00:00:00');
    const endDateTime = new DateTime(endDate, '00:00:00');

    const interval: DateTime[] = [startDateTime.clone()];

    while (startDateTime.getDate() < endDateTime.getDate()) {
      startDateTime.addDay(1);
      interval.push(startDateTime.clone());
    }

    return interval;
  }

  public static ageCalculator(birthdate: string): number {
    if (!DateTime.dateRegex.test(birthdate)) throw Error('Invalid date');
    const birthdateTimestamp = new Date(birthdate).getTime();
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

  public static timeToMinutes(time: string): number {
    const regex = /^(?:[01]\d|2[0-3]):[0-5]\d$/g;

    if (!regex.test(time)) throw new Error('Invalid time');

    const [h, m] = time.split(':');

    return Number(h) * 60 + Number(m);
  }

  public static minutesToHours(minutes: number): number {
    return Math.round((minutes / 60 + Number.EPSILON) * 100) / 100;
  }

  public static utcDateToLocale(UTCDate: string): string {
    if (!DateTime.utcRegex.test(UTCDate)) throw new Error('Invalid date');
    const date = new DateTime(UTCDate);
    return date.getDate();
  }

  public static localeDateToUTC(localeDate: string): string {
    if (!DateTime.dateRegex.test(localeDate)) throw new Error('Invalid date');
    const [year, month, day] = localeDate.split('-');
    const date = new Date(Number(year), Number(month) - 1, Number(day));
    return date.toISOString();
  }
}
