'use strict';

window.debounce = (function () {

  var lastTimeout;

  return function (func, interval) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(func, interval);
  };
})();
