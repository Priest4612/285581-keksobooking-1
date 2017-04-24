'use strict';

window.showCard = (function () {
  var cssClassActive = 'pin--active';
  var currentActivePin;

  var isKeydownHandlerEsc = function isKeydownHandlerEsc(evt, element, cssClass) {
    if (window.utils.isDeactivateEvent(evt)) {
      closeUserDialog(element, cssClass);
    }
  };

  var closeUserDialog = function closeUserDialog(element, cssClass) {
    element.classList.add(cssClass);
    isDeactivatePin(currentActivePin);
    document.removeEventListener('keydown', function (evt) {
      isKeydownHandlerEsc(evt, element, cssClass);
    });
  };

  var closeDialogHandler = function closeDialogHandler(element, activator, cssClass) {
    activator.addEventListener('click', function () {
      closeUserDialog(element, cssClass);
    });
    activator.addEventListener('keydown', function (evt) {
      if (window.utils.isActivateEvent(evt)) {
        closeUserDialog(element, cssClass);
      }
    });
  };


  var openUserDialog = function openUserDialog(element, cssClass) {
    element.classList.remove(cssClass);
    document.addEventListener('keydown', function (evt) {
      isKeydownHandlerEsc(evt, element, cssClass);
    });
  };

  var renderUserDialog = function renderUserDialog(activator, arr) {
    var index = 0;
    for (var i = 0; i < arr.length; i++) {
      if (activator.style.left === (arr[i].location.x + 'px') && activator.style.top === (arr[i].location.y + 'px')) {
        index = i;
      }
    }
    return arr[index];
  };

  var isDeactivatePin = function isDeactivatePin(activePin) {
    if (activePin) {
      activePin.classList.remove(cssClassActive);
    }
  };

  var isActivePin = function isActivePin(activator) {
    isDeactivatePin(currentActivePin);
    currentActivePin = activator;
    activator.classList.add(cssClassActive);
  };

  var openDialogHadler = function openDialogHadler(element, activator, cssClass, listHotels) {
    var lodge = renderUserDialog(activator, listHotels);
    activator.addEventListener('click', function () {
      isActivePin(activator);
      window.card.renderOfferDialog(lodge);
      openUserDialog(element, cssClass);
    });
    activator.addEventListener('keydown', function (evt) {
      if (window.utils.isActivateEvent(evt)) {
        isActivePin(activator);
        window.card.renderOfferDialog(lodge);
        openUserDialog(element, cssClass);
      }
    });
  };


  var clsHidden = 'hidden';
  var tokyo = document.querySelector('.tokyo');
  var offerDialog = tokyo.querySelector('#offer-dialog');
  var dialogClose = offerDialog.querySelector('.dialog__close');
  var listHotels = window.data.generateListLodging();
  return function () {
    closeDialogHandler(offerDialog, dialogClose, clsHidden);
    window.pin.renderPins(listHotels);
    var pins = tokyo.querySelectorAll('.pin:not(.pin__main)');
    for (var i = pins.length; i--;) {
      openDialogHadler(offerDialog, pins[i], clsHidden, listHotels);
    }
  };
})();
