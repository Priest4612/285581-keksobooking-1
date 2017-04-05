'use strict';

window.utils = (function () {
  var module = {};
  module.randomizer = function (begin, end) {

    var getNumberRnd = function (maxNum) {
      var maxNumLen = String(maxNum).length;
      var numRnd = Math.floor(Math.pow(10, Math.floor(Math.random() * maxNumLen + 1)) * Math.random());
      while (numRnd > maxNum) {
        numRnd = Math.floor(Math.pow(10, Math.floor(Math.random() * maxNumLen + 1)) * Math.random());
      }
      return numRnd;
    };

    var getNumberRangeRnd = function (minNum, maxNum) {
      var fromLen = String(minNum).length;
      var toLen = String(maxNum).length;
      var getRandomBetween = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      };
      var getRandomStr = function (len) {
        var randomStr = '';
        for (var j = 0; j < lenRnd; j++) {
          randomStr += getRandomBetween(0, 9).toString();
        }
        return randomStr;
      };
      var fullRandomNum;
      var lenRnd = getRandomBetween(fromLen, toLen);
      do {
        fullRandomNum = parseInt(getRandomStr(lenRnd), 10);
      } while (fullRandomNum < minNum || fullRandomNum > maxNum);
      return fullRandomNum;
    };

    if (!end || end === 0) {
      return getNumberRnd(begin);
    } else {
      return getNumberRangeRnd(begin, end);
    }
  };
  return module;
})();
