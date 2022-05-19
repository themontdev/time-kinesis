import {DateTime, timezones, setDefaultTimezone} from "../src/index";

// @ts-ignore
setDefaultTimezone('UTC')

let now = new DateTime();

// @ts-ignore
let inAlgiers = now.tz("UTC");

console.log(now);
console.log(inAlgiers)
console.log('teste')