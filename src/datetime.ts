import { getDefault as getDefaultTimezone, getTimezoneOffset, timezones } from "./timezones";
import { units } from "./units";
import { unitFactor } from "./unit.factor";
import { format } from "./formatter";

let nativeTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

function addMonth(datetime: DateTime, amount: number): DateTime {
    let date = new Date(datetime.getDate());
    date.setMonth(date.getMonth() + amount);
    return new DateTime(date, datetime.timezone);
};

function addYear(datetime: DateTime, amount: number): DateTime {
    let date = new Date(datetime.getDate());
    date.setFullYear(date.getFullYear() + amount);
    return new DateTime(date, datetime.timezone);
};

function startOfMonth(datetime: DateTime): DateTime {
    let days = datetime.getDate().getDate() - 1;
    return datetime.sub(days, units.days).startOf(units.day);
};

function startOfYear(datetime: DateTime): DateTime {
    let months = datetime.getDate().getMonth()
    return datetime.sub(months, units.months).startOf(units.month);
};

function endOfMonth(datetime: DateTime): DateTime {
    return datetime.add(1, units.month).startOf(units.month).sub(1);
};

function endOfYear(datetime: DateTime): DateTime {
    return datetime.add(1, units.year).startOf(units.year).sub(1);
};

function yearDiff(from: DateTime, to: DateTime, considerTimezone: boolean = true): number {
    let target = considerTimezone ? to.tz(from.timezone) : to;
    return target.getDate().getFullYear() - from.getDate().getFullYear();
};

function monthDiff(from: DateTime, to: DateTime, considerTimezone: boolean = true): number {
    let target = considerTimezone ? to.tz(from.timezone) : to;
    let yearMonths = yearDiff(from, target, false) * 12;
    return yearMonths + target.getDate().getMonth() - from.getDate().getMonth();
};

function diff(from: DateTime, to: DateTime, unit: units = units.millisecond, considerTimezone: boolean = true): number {
    let target = considerTimezone ? to.tz(from.timezone) : to;
    // @ts-ignore
    let factor = unitFactor[unit];
    if (factor)
        return (target.unix() - from.unix()) / factor;
    if ([units.month, units.months].some(u => u == unit))
        return monthDiff(from, target, false);
    if ([units.year, units.years].some(u => u == unit))
        return yearDiff(from, target, false);
    throw new Error(`cannot add unit ${unit}: kinesis not mapped`);
};

function add(datetime: DateTime, amount: number, unit: units = units.millisecond): DateTime {
    if (unit == units.millisecond) return new DateTime(datetime.unix() + amount, datetime.timezone);
    // @ts-ignore
    let factor = unitFactor[unit];
    if (factor)
        // @ts-ignore
        return new DateTime(datetime.unix() + (unitFactor[unit] * amount), datetime.timezone);
    if ([units.month, units.months].some(u => u == unit))
        return addMonth(datetime, amount);
    if ([units.year, units.years].some(u => u == unit))
        return addYear(datetime, amount);
    throw new Error(`cannot add unit ${unit}: kinesis not mapped`);
};

function startOf(datetime: DateTime, unit: units) {
    // @ts-ignore
    let factor = unitFactor[unit];
    if (factor) {
        // @ts-ignore
        let rest = new DateTime(datetime.getDate(), timezones.UTC).tz(nativeTimezone).unix() % factor;
        return new DateTime(datetime.unix() - rest, datetime.timezone);
    }
    if ([units.month, units.months].some(u => u == unit))
        return startOfMonth(datetime);
    if ([units.year, units.years].some(u => u == unit))
        return startOfYear(datetime);
    throw new Error(`cannot get start of unit ${unit}: kinesis not mapped`);
};

function endOf(datetime: DateTime, unit: units) {
    // @ts-ignore
    let factor = unitFactor[unit];
    if (factor) {
        // @ts-ignore
        let rest = new DateTime(datetime.getDate(), timezones.UTC).tz(nativeTimezone).unix() % factor;
        return new DateTime(datetime.unix() - rest + factor - 1, datetime.timezone);
    }
    if ([units.month, units.months].some(u => u == unit))
        return endOfMonth(datetime);
    if ([units.year, units.years].some(u => u == unit))
        return endOfYear(datetime);
    throw new Error(`cannot get start of unit ${unit}: kinesis not mapped`);
};

export class DateTime {
    private date: Date;
    timezone: timezones;

    //unix returns unix epoch.
    // it is the number of milliseconds between the DateTime instance and the start of 1970;
    unix(): number {
        return this.getDate().getTime();
    };

    //add returns a new DateTime instance, adding the given time amount. The current DateTime instance will not be altered;
    add(amount: number = 0, unit: units = units.millisecond): DateTime {
        return add(this, amount, unit)
    };

    //sub returns a new DateTime instance, subtracting the given time amount. The current DateTime instance will not be altered;
    sub(amount: number = 0, unit: units = units.millisecond): DateTime {
        return this.add(-amount, unit);
    };

    diff(datetime: DateTime, unit: units = units.millisecond, considerTimezone: boolean = true): number {
        return diff(this, datetime, unit, considerTimezone);
    };

    //setTimezone alter the instance timezone to the given one;
    //Date and time will *NOT* be converted. To convert date and time, use the tz method;
    setTimezone(timezone: timezones): void {
        this.timezone = timezone;
        return;
    };

    //tzOffset returns the number of milliseconds between the instance timezone, and the given one;
    tzOffset(timezone: timezones): number {
        return getTimezoneOffset(timezone) - getTimezoneOffset(this.timezone);
    };

    //tz returns a new instance of DateTime in the given timezone. Date and time will be converted too. The current DateTime instance will not be altered;
    tz(timezone: timezones): DateTime {
        return new DateTime(this.getDate().getTime() + this.tzOffset(timezone), timezone)
    };

    //utc method returns a new instance of DateTime in UTC timezone. Date and time will be converted too. The current DateTime instance will not be altered;
    utc(): DateTime {
        return this.tz(timezones.UTC)
    };

    //format method returns a string, with de DateTime instance formatted on the given pattern;
    //format patterns will be documented soon. But you can use the same patterns of moment.js;
    format(pattern: string): string {
        return format(this, pattern);
    };

    //isValid return true if this instance of DateTime is valid;
    //invalid instances are created when invalid parameters are given in the constructor method;
    isValid(): boolean {
        return !isNaN(this.unix());
    };

    //startOf return a new instance of DateTime in the same timezone, but in the start of the given time unit. The current DateTime instance will not be altered;
    //For Example: it will return the same day on it's first millisecond, if 'day' is the given time unit;
    //For Example: it will return the same minute on it's first millisecond, if 'minute' is the given time unit;
    //For Example: it will return the same month on it's first millisecond, if 'month' is the given time unit;
    startOf(unit: units) {
        return startOf(this, unit);
    };

    //endOf return a new instance of DateTime in the same timezone, but in the end of the given time unit. The current DateTime instance will not be altered;
    //For Example: it will return the same day on it's last millisecond, if 'day' is the given time unit;
    //For Example: it will return the same minute on it's last millisecond, if 'minute' is the given time unit;
    //For Example: it will return the same month on it's last millisecond, if 'month' is the given time unit;
    endOf(unit: units) {
        return endOf(this, unit);
    };

    //isEqual return true if this instance is equal the given one;
    //Additionally, the precision unit can be used. If not, millisecond unit will be considered;
    isEqual(datetime: DateTime, precision: units = units.millisecond): boolean {
        if (precision == units.millisecond)
            return datetime.unix() == this.unix();
        return this.startOf(precision).unix() == datetime.startOf(precision).unix();
    };


    //isAfter return true if this instance is after the given one;
    //Additionally, the precision unit can be used. If not, millisecond unit will be considered;
    isAfter(datetime: DateTime, precision: units = units.millisecond): boolean {
        if (precision == units.millisecond)
            return datetime.unix() < this.unix();
        return datetime.startOf(precision).unix() < this.startOf(precision).unix();
    };

    //isAfterOrEqual return true if this instance is after, or equal the given one;
    //Additionally, the precision unit can be used. If not, millisecond unit will be considered;
    isAfterOrEqual(datetime: DateTime, precision: units = units.millisecond): boolean {
        if (precision == units.millisecond)
            return datetime.unix() <= this.unix();
        return datetime.startOf(precision).unix() <= this.startOf(precision).unix();
    };

    //isBefore return true if this instance is before the given one;
    //Additionally, the precision unit can be used. If not, millisecond unit will be considered;
    isBefore(datetime: DateTime, precision: units = units.millisecond): boolean {
        if (precision == units.millisecond)
            return datetime.unix() > this.unix();
        return datetime.startOf(precision).unix() > this.startOf(precision).unix();
    };

    //isBeforeOrEqual return true if this instance is before, or equal the given one;
    //Additionally, the precision unit can be used. If not, millisecond unit will be considered;
    isBeforeOrEqual(datetime: DateTime, precision: units = units.millisecond): boolean {
        if (precision == units.millisecond)
            return datetime.unix() >= this.unix();
        return datetime.startOf(precision).unix() >= this.startOf(precision).unix();
    };

    toJSON(): string {
        return this.format('YYYY-MM-DD HH:mm:ss.sss Z ZZ')
    }

    constructor(date?: string | number | Date | DateTime, timezone?: timezones) {
        // @ts-ignore
        if (date instanceof DateTime) {
            this.date = new Date(date.date);
            this.timezone = timezone || date.timezone;
            return;
        }
        timezone = timezone || getDefaultTimezone();

        // @ts-ignore
        this.timezone = timezone;
        if (!date && typeof date != 'number') {
            this.date = new Date();
            return
        }

        if (date instanceof Date)
            this.date = date;
        else
            this.date = new Date(date);
        return this;
    };

    getDate(): Date {
        return this.date;
    }
};

DateTime.prototype.toString = function (): string {
    return this.format('YYYY-MM-DD HH:mm:ss.sss Z ZZ')
};

export function datetime(...props: any[]): DateTime {
    return new DateTime(...props);
};