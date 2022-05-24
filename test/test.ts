import {DateTime, timezones} from "../src/index";

let now = new DateTime().tz(timezones.Africa_Algiers)

console.log(now);
