# DateTime Helper Utility

A TypeScript utility class designed to encapsulate, manipulate, validate, and format common date and time operations. This class handles ISO/UTC string parsing, local formats (`YYYY-MM-DD` and `HH:mm:ss`), interval calculations, and simple weekday internationalization.

---

## Getting Started

Install DateTime using your favorite package manager:

```bash
npm install @mkdigo/datetime
```

---

## 📌 Table of Contents

- [Practical Usage Examples](#-practical-usage-examples)
- [Global Types](#-global-types)
- [Static Properties (Regex)](#%EF%B8%8F-static-properties-regex)
- [Constructor](#-constructor)
- [Instance Methods](#-instance-methods)
  - [Getters (Read-only)](#getters-read-only)
  - [Setters and Mutators (Modification)](#setters-and-mutators-modification)
- [Static Methods](#-static-methods)

---

## 🚀 Practical Usage Examples

### Instantiation and Basic Reading

```typescript
import { DateTime } from './DateTime';

// Instantiate with the current system date and time
const now = new DateTime();
console.log(now.getDate()); // E.g., '2026-06-25'
console.log(now.getTime()); // E.g., '01:53:20'

// Instantiate with specific local values
const xmas = new DateTime('2026-12-25', '20:00:00');
console.log(xmas.getWeekday('en-US')); // 'Fri'
```

### Addition/Subtraction Operations and Age Calculation

```typescript
const myDate = new DateTime('2026-01-01');
myDate.addMonth(3);
myDate.subtractDay(5);
console.log(myDate.getDate()); // '2026-03-27'

// Calculating age
const birthday = new DateTime('1995-03-10');
console.log(`Age: ${birthday.getAge()} years old.`);
```

### Generating Date Intervals

```typescript
const range = DateTime.makeInterval('2026-06-01', '2026-06-05');
range.forEach((dt) => {
  console.log(dt.getDate());
  // Outputs sequentially from '2026-06-01' to '2026-06-05'
});
```

### Time Unit Conversions

```typescript
const minutes = DateTime.timeToMinutes('14:30'); // 870
const timeString = DateTime.minutesToTime(125); // '02:05'
const decimalHours = DateTime.minutesToHours(90); // 1.5
```

---

## 🔤 Global Types

### `TLanguage`

Defines the supported languages for textual display of specific date components (such as weekdays).

```typescript
type TLanguage = 'en-US' | 'pt-BR';
```

---

## ⚙️ Static Properties (Regex)

The class provides public regular expressions for validating text-based date and time formats:

| Property    | Type     | Regular Expression                                       | Expected Format                      |
| :---------- | :------- | :------------------------------------------------------- | :----------------------------------- |
| `dateRegex` | `RegExp` | `/^\d{4}-(?:0[1-9]\|1[0-2])-(?:0[1-9]\|[12]\d\|3[01])$/` | `YYYY-MM-DD`                         |
| `timeRegex` | `RegExp` | `/^(?:[01]\d\|2[0-3]):[0-5]\d:[0-5]\d$/`                 | `HH:mm:ss`                           |
| `utcRegex`  | `RegExp` | `/^\d{4}-...(?:\.\d{3})?Z$/`                             | `YYYY-MM-DDTHH:mm:ss.sssZ` (ISO UTC) |

---

## 🏗️ Constructor

```typescript
constructor(date: string | null = null, time: string | null = null)
```

Initializes a new instance of the DateTime class.

- Parameters:
  - date (string | null): A date string in YYYY-MM-DD format or a complete UTC ISO string. If omitted, it defaults to the current system date.
  - time (string | null): A time string in HH:mm:ss format. If omitted, it defaults to the current system time (ignored if date is a UTC string).

- Behavior:
  - If date matches the UTC format (utcRegex), the internal Date object is directly instantiated, and the time parameter is ignored.
  - Otherwise, it validates the provided (or default) date and time strings. Throws an Invalid date or Invalid time error if validation fails.

---

## ⚡ Instance Methods

### Getters (Read-only)

`getToday()`

Returns the system date at the precise moment the instance was created.

- Returns: string (YYYY-MM-DD format).

`getDate()`

Returns the date stored in the instance.

- Returns: string (YYYY-MM-DD format).

`getTime()`

Returns the time stored in the instance.

- Returns: string (HH:mm:ss format).

`getTimeInMinutes()`

Calculates the total number of minutes that have passed since the start of the day (00:00) for the instance's time.

- Returns: number.

`getYear()` / `getMonth()` / `getDay()`

Returns respectively the full year (e.g., 2026), the month (1-based, e.g., 1 for January), and the day of the month (1-based).

- Returns: number.

`getWeekdayNumber()`

Returns the day of the week index (where 0 is Sunday and 6 is Saturday).

- Returns: number.

`getWeekday(language?: TLanguage)`

Returns the abbreviated name of the weekday based on the provided language (default: 'en-US').

- Returns: string (e.g., 'Sun', 'Mon' for 'en-US' or 'Dom', 'Seg' for 'pt-BR').

`getTimestamp()`

Returns the primitive value of the specified date in milliseconds (Unix Timestamp).

- Returns: number.

`getAge()`

Calculates the age based on the instance's date relative to the current real date.

- Returns: number.

`toISOString()`

Returns the date converted to the standard ISO format string.

- Returns: string.

`clone()`

Creates a new clone instance of the current DateTime object preserving its date and time.

- Returns: DateTime.

### Setters and Mutators (Modification)

All mutator methods validate the incoming data and directly modify the internal Date object state.

| Method                       | Signature                       | Description                                           | Exception                |
| :--------------------------- | :------------------------------ | :---------------------------------------------------- | :----------------------- |
| `setYear`                    | `setYear(year: number): void`   | Changes the year of the instance (Requires 4 digits). | `Error('Invalid year')`  |
| `setMonth`                   | `setMonth(month: number): void` | Changes the month (Accepts 1 to 12).                  | `Error('Invalid month')` |
| `setDay`                     | `setDay(day: number): void`     | Changes the day of the month (Accepts 1 to 31).       | `Error('Invalid day')`   |
| `addYear` / `subtractYear`   | `(n: number): void`             | Adds or subtracts n years to/from the instance.       | None                     |
| `addMonth` / `subtractMonth` | `(n: number): void`             | Adds or subtracts n months to/from the instance.      | None                     |
| `addDay` / `subtractDay`     | `(n: number): void`             | Adds or subtracts n days to/from the instance.        | None                     |

---

## 🛠️ Static Methods

`DateTime.makeInterval(startDate: string, endDate: string)`

Generates an array containing DateTime instances for each day within the range, including boundaries.

- Parameters: Two strings in YYYY-MM-DD format.

- Returns: DateTime[] (Returns [] if formats are invalid or if startDate >= endDate).

`DateTime.ageCalculator(birthdate: string)`

Statically calculates an age based on a birthdate string.

- Parameters: birthdate: string (YYYY-MM-DD).

- Returns: number (Calculated age).

`DateTime.minutesToTime(minutes: number)`

Converts a total number of minutes into a simplified time string.

- Returns: string (HH:mm format).

`DateTime.timeToMinutes(time: string)`

Converts a short time string (HH:mm) into total minutes.

- Returns: number. Throws an error if the format is invalid.

`DateTime.minutesToHours(minutes: number)`

Converts minutes to decimal hours rounded to two decimal places.

- Returns: number (e.g., 150 minutes becomes 2.5).

`DateTime.utcDateToLocale(UTCDate: string)`

Extracts the local date portion (YYYY-MM-DD) from a valid ISO UTC string.

- Returns: string.

`DateTime.localeDateToUTC(localeDate: string)`

Converts a local date (YYYY-MM-DD) to the beginning of that day in ISO UTC (Z) string format.

- Returns: string.
