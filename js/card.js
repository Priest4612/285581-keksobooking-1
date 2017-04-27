'use strict';

window.card = (function () {
  var module = {};
  module.renderOfferDialog = function renderOfferDialog(lodge) {
    var offerDialog = document.querySelector('#offer-dialog');
    var dialogPanel = offerDialog.querySelector('.dialog__panel');

    var dialogTitle = offerDialog.querySelector('.dialog__title');
    dialogTitle.querySelector('img').src = lodge.author.avatar;
    var lodgeTemplate = document.querySelector('#lodge-template').content;

    var lodgeElement = lodgeTemplate.cloneNode(true);
    lodgeElement.querySelector('.lodge__title').textContent = lodge.offer.title;
    lodgeElement.querySelector('.lodge__address').textContent = lodge.offer.address;
    lodgeElement.querySelector('.lodge__price').textContent = lodge.offer.price + ' р/ночь';

    var lodgeType = lodgeElement.querySelector('.lodge__type');
    switch (lodge.offer.type) {
      case 'flat':
        lodgeType.textContent = 'Квартира';
        break;
      case 'bungalo':
        lodgeType.textContent = 'Бунгало';
        break;
      case 'house':
        lodgeType.textContent = 'Дом';
        break;
      default:
        lodgeType.textContent = 'Квартира';
    }

    lodgeElement.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + lodge.offer.guests + ' гостей в ' + lodge.offer.rooms + ' комнатах';
    lodgeElement.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + lodge.offer.checkin + ', выезд до ' + lodge.offer.checkout;

    var features = lodgeElement.querySelector('.lodge__features');
    lodge.offer.features.forEach(function (obj) {
      var feature = document.createElement('span');
      feature.classList.add('feature__image');
      feature.classList.add('feature__image--' + obj);
      features.appendChild(feature);
    });

    lodgeElement.querySelector('.lodge__description').textContent = lodge.offer.description;

    offerDialog.removeChild(dialogPanel);
    offerDialog.appendChild(lodgeElement);
  };

  return module;
})();
