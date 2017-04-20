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

  return module;
})();
