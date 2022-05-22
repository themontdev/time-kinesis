import {DateTime, timezones} from "../src/index";
import {units} from "../src/units";

let now = new DateTime().add(130, units.day).format('YYYY-MMMM-DD HH:mm:ss.sss z');
let algiers = new DateTime().tz(timezones.Africa_Algiers).format('YYYY-MM-DD HH:mm:ss z')

console.log(now);
console.log(algiers)
console.log('teste')