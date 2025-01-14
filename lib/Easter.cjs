'use strict';

var easter = require('date-easter');
var CalDate = require('caldate');
var CalEvent = require('./CalEvent.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var easter__default = /*#__PURE__*/_interopDefaultLegacy(easter);
var CalDate__default = /*#__PURE__*/_interopDefaultLegacy(CalDate);

class Easter extends CalEvent {
  /**
   * @param {object} [opts]
   * @param {string} opts.type - type of eastern (easter|orthodox)
   * @param {number|string} opts.offset - offset in days
   */
  constructor (opts) {
    opts = opts || {};
    super(opts);

    this._fn = easter__default['default'].easter;
    if (opts.type === 'orthodox') {
      this._fn = easter__default['default'].orthodoxEaster;
    }
  }

  inYear (year) {
    const d = (new CalDate__default['default'](this._fn(year))).setOffset(this.offset);
    this.dates.push(d);
    return this
  }
}

module.exports = Easter;
