'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * {
 *   0: 'sunday', ...
 *   sunday: 0, ...
 * }
 */
const DAYS = (function () {
  const o = {};
  'sunday|monday|tuesday|wednesday|thursday|friday|saturday'
    .split('|')
    .forEach((name, idx) => {
      o[name] = idx;
      o[idx] = name;
    });
  return o
})();

function objectToString (o) {
  return Object.prototype.toString.call(o)
}

function isObject (arg) {
  return typeof arg === 'object' && arg !== null
}

function isDate (d) {
  return isObject(d) && objectToString(d) === '[object Date]'
}

/**
 * convert string to number
 * @private
 * @param {String} str
 * @return {Number} converted number or undefined
 */
function toNumber (str) {
  const num = parseInt(str, 10);
  if (!isNaN(num)) {
    return num
  }
}

/**
 * extract or set year
 * @private
 * @param {Number|Date|String} year
 * @return {Number} year
 */
function toYear (year) {
  if (!year) {
    year = new Date().getFullYear();
  } else if (year instanceof Date) {
    year = year.getFullYear();
  } else if (typeof year === 'string') {
    year = toNumber(year);
  }
  return year
}

/**
 * convert string to Date.
 * 2017        : year = 2017, month = 1, day = 1
 * '2017-07'   : year = 2017, month = 7, day = 1
 * '2017-07-03': year = 2017, month = 7, day = 3
 * @param {String} str
 * @param {Boolean} isUTC - return date in UTC
 * @return {Date}
 */
function toDate (str, isUTC) {
  const m = /^(\d{4})(?:-(\d{2})(?:-(\d{2}))?)?.*$/.exec((str || '').toString());
  if (m) {
    m.shift();
    const [year, month, day] = m.map((num) => parseInt(num || 1, 10));
    if (isUTC) {
      return new Date(Date.UTC(year, month - 1, day))
    } else {
      return new Date(year, month - 1, day)
    }
  }
}

exports.DAYS = DAYS;
exports.isDate = isDate;
exports.isObject = isObject;
exports.toDate = toDate;
exports.toNumber = toNumber;
exports.toYear = toYear;
