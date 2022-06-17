import {DateTime} from "./datetime";
import {getTimezone, ITimezone, timezones} from "./timezones";
import {units} from "./units";

const monthNames = {
    1: 'January',
    2: 'February',
    3: 'March',
    4: 'April',
    5: 'May',
    6: 'June',
    7: 'July',
    8: 'August',
    9: 'September',
    10: 'October',
    11: 'November',
    12: 'December'
};
const timezoneReplacers = {
    ZZZZ: (datetime: DateTime, timezone: ITimezone) => timezone.description,
    ZZZ: (datetime: DateTime, timezone: ITimezone) => timezone.name,
    ZZ: (datetime: DateTime, timezone: ITimezone) => timezone.utc,
    Z: (datetime: DateTime, timezone: ITimezone) => {
        let tz = new DateTime(0).tz(timezones.UTC).add(Math.abs(timezone.offset), units.hours).format('HH:mm');
        if(timezone.offset >= 0) return `+${tz}`;
        return `-${tz}`;
    },
    z: (datetime: DateTime, timezone: ITimezone) => timezone.offset

};

const monthReplacers = {
    // @ts-ignore
    MMMM: (datetime: DateTime, timezone: ITimezone) => monthNames[(datetime.getDate().getMonth() + 1)],
    // @ts-ignore
    MMM: (datetime: DateTime, timezone: ITimezone) => monthNames[(datetime.getDate().getMonth() + 1)].slice(0, 3),
    // @ts-ignore
    MM: (datetime: DateTime, timezone: ITimezone) => (datetime.getDate().getMonth() + 1).toString().padStart(2, '0'),

    M: (datetime: DateTime, timezone: ITimezone) => datetime.getDate().getMonth() + 1,
    Mo: (datetime: DateTime, timezone: ITimezone) => {
        let month = datetime.getDate().getMonth() + 1;
        if (month == 1) return `${month}st`;
        if (month == 2) return `${month}nd`;
        if (month == 3) return `${month}rd`;
        return `${month}th`;
    }
};

const yearReplacers = {
    YYYY: (datetime: DateTime, timezone: ITimezone) => datetime.getDate().getFullYear(),
    YY: (datetime: DateTime, timezone: ITimezone) => datetime.getDate().getFullYear().toString().slice(2, 4)
};

const dayOfMonthReplacers = {
    // @ts-ignore
    DD: (datetime: DateTime, timezone: ITimezone) => datetime.getDate().getDate().toString().padStart(2, '0'),
    D: (datetime: DateTime, timezone: ITimezone) => datetime.getDate().getDate()
};

const hourReplacers = {
    // @ts-ignore
    HH: (datetime: DateTime, timezone: ITimezone) => datetime.getDate().getHours().toString().padStart(2, '0'),
    H: (datetime: DateTime, timezone: ITimezone) => datetime.getDate().getHours(),
    h: (datetime: DateTime, timezone: ITimezone) => {
        let hours = datetime.getDate().getHours();
        if (hours <= 12) return hours;
        return hours - 12;
    },
    hh: (datetime: DateTime, timezone: ITimezone) => {
        let hours = datetime.getDate().getHours();
        // @ts-ignore
        if (hours <= 12) return hours.toString().padStart(2, '0');
        // @ts-ignore
        return (hours - 12).toString().padStart(2, '0');
    },
};

const minuteReplacers = {
    // @ts-ignore
    mm: (datetime: DateTime, timezone: ITimezone) => datetime.getDate().getMinutes().toString().padStart(2, '0'),
    m: (datetime: DateTime, timezone: ITimezone) => datetime.getDate().getMinutes(),
};

const millisecondReplacers = {
    // @ts-ignore
    sss: (datetime: DateTime, timezone: ITimezone) => datetime.getDate().getMilliseconds().toString().padStart(3, '0'),
};

const secondReplacers = {
    // @ts-ignore
    ss: (datetime: DateTime, timezone: ITimezone) => datetime.getDate().getSeconds().toString().padStart(2, '0'),
    s: (datetime: DateTime, timezone: ITimezone) => datetime.getDate().getSeconds()
};

const replacers = {
    ...timezoneReplacers,
    ...yearReplacers,
    ...monthReplacers,
    ...dayOfMonthReplacers,
    ...hourReplacers,
    ...minuteReplacers,
    ...millisecondReplacers,
    ...secondReplacers
};

// @ts-ignore
function desc(arr) {
    // @ts-ignore
    return arr.sort((a, b) => {
        return b.index - a.index;
    });
}

const replaceDeadzones = (deadzones: any[], target: string): string => {
    let result = target.slice()
    for (let deadzone of deadzones) {
        result = `${result.slice(0, deadzone.index)}${result.slice(deadzone.index + deadzone.length)}`;
    }
    return result;
};

const isDeadZone = (deadzones: any[], index: number) => {
    for (let deadzone of deadzones) {
        if (index >= deadzone.index && index <= (deadzone.index + deadzone.length)) return deadzone;
    }
    return;
};


export function format(datetime: DateTime, pattern: string): string {
    let timezone = getTimezone(datetime.timezone);
    let deadzones: any[] = [];
    let replaces = [];
    for (let rep of Object.keys(replacers)) {
        if (!replaceDeadzones(deadzones, pattern).includes(rep)) continue;
        let index = pattern.lastIndexOf(rep);
        while (index > -1) {
            let deadzone = isDeadZone(deadzones, index)
            if (deadzone) {
                index = pattern.slice(0, deadzone.index).lastIndexOf(rep);
                continue;
            }
            let length = rep.length;
            deadzones.push({index, length})
            desc(deadzones)
            // @ts-ignore
            replaces.push({replacer: replacers[rep], index, length});
            index = pattern.slice(0, index).lastIndexOf(rep)
        }
    }
    let result = pattern.slice();
    desc(replaces)
    for (let replace of replaces) {
        result = `${result.slice(0, replace.index)}${replace.replacer(datetime, timezone)}${result.slice(replace.index + replace.length)}`;
    }
    return result;
};