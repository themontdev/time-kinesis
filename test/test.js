const {DateTime, timezones, setDefaultTimezone, Timezone, datetime} = require('../dist/index');

setDefaultTimezone(timezones.UTC)



let now = datetime().add(125, 'day').tz(timezones.America_Argentina_SanLuis).format('YYYY-MMMM-DD HH:mm:ss.sss');
// let utc = now.tz(Timezone);

console.log(JSON.stringify(now));