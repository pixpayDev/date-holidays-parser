'use strict';

var astronomia = require('astronomia');
var vsopEarth = require('astronomia/data/vsop87Bearth');
var moment = require('moment-timezone');
var CalDate = require('caldate');
var CalEvent = require('./CalEvent.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var vsopEarth__default = /*#__PURE__*/_interopDefaultLegacy(vsopEarth);
var moment__default = /*#__PURE__*/_interopDefaultLegacy(moment);
var CalDate__default = /*#__PURE__*/_interopDefaultLegacy(CalDate);

const earth = new astronomia.planetposition.Planet(vsopEarth__default['default']);

class Equinox extends CalEvent {
  /**
   * @param {object} [opts]
   * @param {string} opts.season - type of season (spring|summer|autumn|winter)
   * @param {number|string} opts.offset - offset in days
   */
  constructor (opts) {
    opts = opts || {};
    super(opts);

    this._season = opts.season;
    this._timezone = opts.timezone || 'GMT';
  }

  inYear (year) {
    let jde;
    switch (this._season) {
      case 'march': {
        jde = astronomia.solstice.march2(year, earth);
        break
      }
      case 'june': {
        jde = astronomia.solstice.june2(year, earth);
        break
      }
      case 'september': {
        jde = astronomia.solstice.september2(year, earth);
        break
      }
      case 'december': {
        jde = astronomia.solstice.december2(year, earth);
        break
      }
    }

    const str = new astronomia.julian.Calendar().fromJDE(jde).toDate().toISOString();
    let date;
    if (/^[+-]\d{2}:\d{2}?$/.test(this._timezone)) { // for '+08:00' formats
      date = moment__default['default'](str).utcOffset(this._timezone);
    } else { // for 'Asia/Shanghai' formats
      date = moment__default['default'](str).tz(this._timezone); // move to timezone
    }

    const floorDate = {
      year: year,
      month: date.month() + 1,
      day: date.date()
    };

    const d = new CalDate__default['default'](floorDate).setOffset(this.offset);
    this.dates.push(d);
    return this
  }
}

module.exports = Equinox;
