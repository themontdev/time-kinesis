import {getDefault as getDefaultTimezone, getTimezoneOffset, timezones} from "./timezones";
import {units} from "./units";
import {unitFactor} from "./unit.factor";
import {format} from "./formatter";

export class DateTime {
    date: Date;
    timezone: timezones;

    unix(): number {
        return this.date.getTime();
    };

    add(amount: number = 0, unit: units = units.millisecond): DateTime {
        if (unit == units.millisecond)
            return new DateTime(this.unix() + amount);
        ;
        // @ts-ignore
        return new DateTime(this.unix() + (unitFactor[unit] * amount), this.timezone);
    };

    sub(amount: number = 0, unit: units = units.millisecond): DateTime {
        return this.add(-amount, unit);
    };

    setTimezone(timezone: timezones): void {
        this.timezone = timezone;
        return;
    };

    tzOffset(timezone: timezones): number {
        return getTimezoneOffset(timezone) - getTimezoneOffset(this.timezone);
    };

    tz(timezone: timezones): DateTime {
        return new DateTime(this.date.getTime() + this.tzOffset(timezone), timezone)
    };

    utc(): DateTime {
        return this.add(this.date.getTimezoneOffset(), units.minute);
    };

    format(pattern: string): string {
        return format(this, pattern);
    };

    constructor(date?: string | number | Date, timezone: timezones = getDefaultTimezone()) {
        // @ts-ignore

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
};




