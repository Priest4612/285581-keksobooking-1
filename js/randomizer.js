'use strict';

window.randomizer = (function () {
  var module = {};

  module.getNumberRnd = function getNumberRnd(maxNum) {
    var maxNumLen = String(maxNum).length;
    var numRnd = Math.floor(Math.pow(10, Math.floor(Math.random() * maxNumLen + 1)) * Math.random());
    while (numRnd > maxNum) {
      numRnd = Math.floor(Math.pow(10, Math.floor(Math.random() * maxNumLen + 1)) * Math.random());
    }
    return numRnd;
  };


  var getRandomBetween = function getRandomBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var getRandomStr = function getRandomStr(len) {
    var randomStr = '';
    for (var j = 0; j < len; j++) {
      randomStr += getRandomBetween(0, 9).toString();
    }
    return randomStr;
  };

  module.getNumberRangeRnd = function getNumberRangeRnd(minNum, maxNum) {
    var fromLen = String(minNum).length;
    var toLen = String(maxNum).length;

    var fullRandomNum;
    var lenRnd = getRandomBetween(fromLen, toLen);
    do {
      fullRandomNum = parseInt(getRandomStr(lenRnd), 10);
    } while (fullRandomNum < minNum || fullRandomNum > maxNum);
    return fullRandomNum;
  };

  return module;
})();
