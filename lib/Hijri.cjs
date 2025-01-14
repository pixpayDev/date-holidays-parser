'use strict';

var CalDate = require('caldate');
var CalEventMap = require('./CalEventMap.cjs');
var hijriCalendar = require('./internal/hijri-calendar.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var CalDate__default = /*#__PURE__*/_interopDefaultLegacy(CalDate);

class Hijri extends CalEventMap {
  constructor (opts) {
    super(opts);
    this.calendar = hijriCalendar.calendar;
  }

  get (timezone) {
    const arr = this.dates.map((date) => {
      const cdate = new CalDate__default['default'](date);
      const o = {
        date: cdate.toString() + ' -0600',
        start: cdate.setOffset(-6, 'h').toTimezone(timezone),
        end: cdate.toEndDate().toTimezone(timezone)
      };
      this._addSubstitute(date, o);
      return o
    });
    return arr
  }
}

module.exports = Hijri;
