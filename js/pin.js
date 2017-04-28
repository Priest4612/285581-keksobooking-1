'use strict';

window.pin = (function () {
  var module = {};

  var renderPin = function renderPin(obj) {
    var pin = document.createElement('div');
    var pinX = 56 / 2;
    var pinY = 75 / 2;
    pin.classList.add('pin');
    pin.style.position = 'absolute';
    pin.style.left = obj.location.x - pinX + 'px';
    pin.style.top = obj.location.y - pinY + 'px';

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


  module.renderPins = function renderPins(listLodging) {
    var fragment = document.createDocumentFragment();
    listLodging.forEach(function (obj) {
      fragment.appendChild(renderPin(obj));
    });
    var tokyoPinMap = document.querySelector('.tokyo__pin-map');
    tokyoPinMap.appendChild(fragment);
  };

  module.removePins = function removePins(parrent) {
    var pins = parrent.querySelectorAll('.pin:not(.pin__main)');
    pins.forEach(function (pin) {
      parrent.removeChild(pin);
    });
  };


  return module;
})();
