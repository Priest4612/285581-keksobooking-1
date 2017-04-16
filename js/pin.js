'use strict';

window.pin = (function () {
  var module = {};

  var renderPin = function (obj) {
    var pin = document.createElement('div');
    pin.classList.add('pin');
    pin.style.position = 'absolute';
    pin.style.left = obj.location.x + 'px';
    pin.style.top = obj.location.y + 'px';

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


  module.renderPins = function (listHotels) {
    var fragment = document.createDocumentFragment();
    listHotels.forEach(function (obj) {
      fragment.appendChild(renderPin(obj));
    });
    var tokyoPinMap = document.querySelector('.tokyo__pin-map');
    tokyoPinMap.appendChild(fragment);
  };


  return module;
})();
