'use strict';

window.utils = (function () {
  var module = {};
  var ENTER_KEY_CODE = 13;
  var ESCAPE_KEY_CODE = 27;

  var isKeyboardEvent = function isKeyboardEvent(evt) {
    return typeof evt.keyCode !== 'undefined';
  };

  module.isActivateEvent = function isActivateEvent(evt) {
    return isKeyboardEvent(evt) && evt.keyCode === ENTER_KEY_CODE;
  };

  module.isDeactivateEvent = function isDeactivateEvent(evt) {
    return isKeyboardEvent(evt) && evt.keyCode === ESCAPE_KEY_CODE;
  };

  module.isFunctionCB = function checkCallBack(cb) {
    return cb && typeof (cb) === 'function';
  };

  var getUniqueElement = function getUniqueElement(arr) {
    var elem;
    while (!elem) {
      var indexArr = window.randomizer.getNumberRnd(arr.length - 1);
      elem = arr[indexArr];
    }
    elem = arr.splice(indexArr, 1);
    return elem[0];
  };

  module.createNewArray = function createNewArray(arr, length) {
    var newArray = [];
    var arrCopy = arr.slice();
    for (var i = length; i--;) {
      var elem = getUniqueElement(arrCopy);
      while (!elem) {
        elem = getUniqueElement(arrCopy);
      }
      newArray.push(elem);
    }
    return newArray;
  };


  return module;
})();
