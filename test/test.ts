import {DateTime, timezones} from "../src/index";

let now = new DateTime().format('YYYY-MM-DD HH:mm:ss z');
let algiers = new DateTime().tz(timezones.Africa_Algiers).format('YYYY-MM-DD HH:mm:ss z')

console.log(now);
console.log(algiers)
console.log('teste')