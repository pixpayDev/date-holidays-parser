'use strict';

var CalEvent = require('./CalEvent.cjs');
var CalDate = require('caldate');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var CalDate__default = /*#__PURE__*/_interopDefaultLegacy(CalDate);

/**
 * Mapper class for mapped calenders like hijri and hebrew
 * `this.calender` needs to be set in child classes
 */
class CalEventMap extends CalEvent {
  constructor (opts) {
    super(opts);
    this.calendar = {};
  }

  inYear (year) {
    if (!(this.calendar[year] && this.calendar[year + 1] && this.calendar[year - 1])) {
      return this
    }

    for (let y = year - 1; y <= year + 1; y++) {
      // resolve date in `calendar` as gregorian date
      const firstDays = this.calendar[y][this.opts.month - 1];
      // firstDays `[M, D, diffYear]`
      for (let i = 0; i < firstDays.length; i += 3) {
        if (this.opts.year) {
          const calYear = this.calendar.year + firstDays[i + 2];
          if (this.opts.year !== calYear) {
            break
          }
        }
        const d = (new CalDate__default['default']({
          year: y,
          month: firstDays[i] + 1,
          day: firstDays[i + 1]
        })).setOffset(this.opts.day - 1);

        if (d.year === year) {
          this.dates.push(d);
        }
      }
    }
    return this
  }
}

module.exports = CalEventMap;
