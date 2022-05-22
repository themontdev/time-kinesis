const {DateTime, timezones, setDefaultTimezone, Timezone} = require('../dist/index');

setDefaultTimezone(timezones.UTC)

let now = new DateTime();
let utc = now.tz(Timezone);

console.log(now, utc)