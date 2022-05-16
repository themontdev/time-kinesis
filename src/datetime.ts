import {unitFactor, units} from "./units";

export class DateTime {
    date: Date;

    unix(): number {
        return this.date.getTime();
    };

    add(amount: number = 0, unit: units = units.millisecond): DateTime {
        if (unit == units.millisecond)
            return new DateTime(this.unix() + amount);
        ;
        return new DateTime(this.unix() + (unitFactor[unit] * amount));
    };

    sub(amount: number = 0, unit: units = units.millisecond): DateTime {
        return this.add(-amount, unit);
    };

    utc(): DateTime {
        return this.add(this.date.getTimezoneOffset(), units.minute);
    };

    toTimeZone(timezone: string): DateTime {
        const formatter = new Intl.DateTimeFormat('en-US', {timeZone: timezone});
        return new DateTime(formatter.format(this.date));
    };


    constructor(date?: string | number | Date) {
        if (!date && typeof date != 'number'){
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

