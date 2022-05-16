import {DateTime} from "../src/datetime";

let now = new DateTime();

let tz = Intl.DateTimeFormat().resolvedOptions().timeZone

let inAlgiers = now.toTimeZone('Africa/Algiers');

console.log(now);
console.log(inAlgiers)
console.log('teste')