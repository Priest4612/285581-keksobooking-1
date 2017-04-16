'use strict';

window.form = (function () {
  var module = {};

  module.setTime = function (activator, element) {
    activator.addEventListener('change', function (evt) {
      element.selectedIndex = evt.target.selectedIndex;
    });
  };


  module.setCountGuests = function (activator, element, obj) {
    activator.addEventListener('change', function (evt) {
      var targetValue = evt.target.value;
      element.value = obj[targetValue];
    });
  };


  module.setMinPrice = function (activator, element, obj) {
    activator.addEventListener('change', function (evt) {
      var targetValue = evt.target.value;
      element.value = obj[targetValue];
      element.min = obj[targetValue];
    });
  };

  return module;
})();
