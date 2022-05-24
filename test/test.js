const {DateTime, timezones, setDefaultTimezone, Timezone} = require('../dist/index');

setDefaultTimezone(timezones.UTC)

let now = new DateTime().add(125, 'day').tz(timezones.).format('YYYY-MMMM-DD HH:mm:ss.sss');
// let utc = now.tz(Timezone);

console.log(now)