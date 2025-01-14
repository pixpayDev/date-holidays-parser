'use strict';

var dateChinese = require('date-chinese');
var CalEvent = require('./CalEvent.cjs');
var CalDate = require('caldate');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var CalDate__default = /*#__PURE__*/_interopDefaultLegacy(CalDate);

class Chinese extends CalEvent {
  /**
   * @param {object} [opts]
   */
  constructor (opts) {
    opts = opts || {};
    super(opts);
    switch (opts.fn) {
      case 'chinese':
        this.cal = new dateChinese.CalendarChinese();
        break
      case 'korean':
        this.cal = new dateChinese.CalendarKorean();
        break
      case 'vietnamese':
        this.cal = new dateChinese.CalendarVietnamese();
        break
    }
  }

  inYear (year) {
    let d;
    let jde;
    let date;
    const opts = this.opts;
    if (opts.solarterm) {
      jde = this.cal.solarTerm(opts.solarterm, year);
      date = this.cal.fromJDE(jde).toGregorian();
      d = new CalDate__default['default'](date).setOffset(opts.day - 1);
    } else {
      this.cal.set(opts.cycle, opts.year, opts.month, opts.leapMonth, opts.day);
      jde = this.cal.toJDE(year);
      date = this.cal.fromJDE(jde).toGregorian();
      d = new CalDate__default['default'](date);
    }

    this.dates.push(d);
    return this
  }
}

module.exports = Chinese;
