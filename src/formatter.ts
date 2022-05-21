import {DateTime} from "./datetime";
import {ITimezone, getTimezone} from "./timezones";

const replacers = {
    ZZZ: (datetime: DateTime, timezone: ITimezone) => timezone.description,
    ZZ: (datetime: DateTime, timezone: ITimezone) => timezone.name,
    Z: (datetime: DateTime, timezone: ITimezone) => timezone.utc,
    z: (datetime: DateTime, timezone: ITimezone) => timezone.offset,
    YYYY: (datetime: DateTime, timezone: ITimezone) => datetime.date.getFullYear(),
    // @ts-ignore
    MM: (datetime: DateTime, timezone: ITimezone) => (datetime.date.getMonth()+1).toString().padStart(2, '0'),
    M: (datetime: DateTime, timezone: ITimezone) => datetime.date.getMonth()+1,
    // @ts-ignore
    DD: (datetime: DateTime, timezone: ITimezone) => datetime.date.getDate().toString().padStart(2, '0'),
    // @ts-ignore
    HH: (datetime: DateTime, timezone: ITimezone) => datetime.date.getHours().toString().padStart(2, '0'),
    // @ts-ignore
    mm: (datetime: DateTime, timezone: ITimezone) => datetime.date.getMinutes().toString().padStart(2, '0'),
    // @ts-ignore
    sss: (datetime: DateTime, timezone: ITimezone) => datetime.date.getMilliseconds().toString().padStart(3, '0'),
    // @ts-ignore
    ss: (datetime: DateTime, timezone: ITimezone) => datetime.date.getSeconds().toString().padStart(2, '0')
}

export function format (datetime: DateTime, pattern: string): string{
    let timezone = getTimezone(datetime.timezone);
    let result = pattern.slice();
    for(let rep of Object.keys(replacers)){
        if(pattern.includes(rep)){
            // @ts-ignore
            result = result.replace(rep, replacers[rep](datetime, timezone));
        }
    }
    return result;
}