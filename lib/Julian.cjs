'use strict';

var astronomia = require('astronomia');
var CalDate = require('caldate');
var CalEvent = require('./CalEvent.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var CalDate__default = /*#__PURE__*/_interopDefaultLegacy(CalDate);

class Julian extends CalEvent {
  inYear (year) {
    if (this.opts.year && this.opts.year !== year) {
      return this
    }
    const cal = new astronomia.julian.CalendarJulian(year, this.opts.month, this.opts.day).toGregorian();
    const d = (new CalDate__default['default'](cal)).setOffset(this.offset);
    this.dates.push(d);
    return this
  }
}

module.exports = Julian;
