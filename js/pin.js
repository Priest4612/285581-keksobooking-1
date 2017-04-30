'use strict';

window.pin = (function () {
  var module = {};

  var renderPin = function renderPin(obj) {
    var pin = document.createElement('div');
    pin.classList.add('pin');
    pin.style.position = 'absolute';
    pin.style.left = obj.location.x - window.constants.pinMiddleX + 'px';
    pin.style.top = obj.location.y - window.constants.pinHeight + 'px';

    var image = document.createElement('img');
    var widthImage = 40;
    var heightImage = 40;
    image.src = obj.author.avatar;
    image.classList.add('rounded');
    image.style.width = widthImage + 'px';
    image.style.height = heightImage + 'px';
    image.setAttribute('tabindex', '0');
    pin.appendChild(image);

    return pin;
  };


  module.renderPins = function renderPins(map, pinsData) {
    var fragment = document.createDocumentFragment();
    pinsData.forEach(function (pinData) {
      fragment.appendChild(renderPin(pinData));
    });
    map.appendChild(fragment);
  };

  module.removePins = function removePins(parrent, pins) {
    pins.forEach(function (pin) {
      parrent.removeChild(pin);
    });
  };


  return module;
})();
