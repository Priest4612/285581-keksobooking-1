'use strict';

window.renderElements = (function () {
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

  module.renderOfferDialog = function (listHotels) {
    var offerDialog = document.querySelector('#offer-dialog');
    var dialogPanel = offerDialog.querySelector('.dialog__panel');
    var dialogTitle = offerDialog.querySelector('.dialog__title');
    dialogTitle.querySelector('img').src = listHotels[0].author.avatar;
    var lodgeTemplate = document.querySelector('#lodge-template').content;
    var lodgeElement = lodgeTemplate.cloneNode(true);
    lodgeElement.querySelector('.lodge__title').textContent = listHotels[0].offer.title;
    lodgeElement.querySelector('.lodge__address').textContent = listHotels[0].offer.address;
    lodgeElement.querySelector('.lodge__price').textContent = listHotels[0].offer.price + ' р/ночь';
    var logeType = lodgeElement.querySelector('.lodge__type');
    switch (listHotels[0].offer.type) {
      case 'flat':
        logeType.textContent = 'Квартира';
        break;
      case 'bungalo':
        logeType.textContent = 'Бунгало';
        break;
      case 'house':
        logeType.textContent = 'Дом';
        break;
      default:
        logeType.textContent = 'Херня';
    }
    lodgeElement.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + listHotels[0].offer.guests + ' гостей в ' + listHotels[0].offer.rooms + ' комнатах';
    lodgeElement.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + listHotels[0].offer.checkin + ', выезд до ' + listHotels[0].offer.checkout;
    var features = lodgeElement.querySelector('.lodge__features');
    listHotels[0].offer.features.forEach(function (obj) {
      var feature = document.createElement('span');
      feature.classList.add('feature__image');
      feature.classList.add('feature__image--' + obj);
      features.appendChild(feature);
    });
    lodgeElement.querySelector('.lodge__description').textContent = listHotels[0].offer.description;
    offerDialog.removeChild(dialogPanel);
    offerDialog.appendChild(lodgeElement);
  };


  return module;
})();
