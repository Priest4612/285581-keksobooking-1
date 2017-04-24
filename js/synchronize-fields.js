'use strict';

window.synchronizeFields = (function synchronizeField() {
  return function (activator, element, obj, callback) {
    if (callback && typeof (callback) === 'function') {
      activator.addEventListener('change', function (evt) {
        callback(evt, element, obj);
      });
    }
  };
})();
