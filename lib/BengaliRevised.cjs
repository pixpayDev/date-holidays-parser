'use strict';

var CalBengali = require('date-bengali-revised');
var CalDate = require('caldate');
var CalEvent = require('./CalEvent.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var CalBengali__default = /*#__PURE__*/_interopDefaultLegacy(CalBengali);
var CalDate__default = /*#__PURE__*/_interopDefaultLegacy(CalDate);

class BengaliRevised extends CalEvent {
  /**
   * @param {object} [opts]
   */
  constructor (opts) {
    opts = opts || {};
    super(opts);
  }

  inYear (year) {
    const opts = this.opts;
    const date = new CalBengali__default['default'](year - 593, opts.month, opts.day).toGregorian();
    const d = new CalDate__default['default'](date);
    this.dates.push(d);
    return this
  }
}

module.exports = BengaliRevised;
