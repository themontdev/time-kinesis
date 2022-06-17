import {DateTime, units, datetime} from "../src/index";

let now = datetime();
let nextMonth = now.add(7, units.month)

let difference = now.diff(nextMonth, units.year)

console.log(now);
