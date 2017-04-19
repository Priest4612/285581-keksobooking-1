'use strict';

window.openCloseHandler = (function () {
  var module = {};

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

  module.closeDialog = function closeDialog(element, activator, cssClass) {
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

    // console.log(image.src.slice(2, -4));
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

  module.openDialog = function openDialog(element, activator, cssClass, listHotels) {
    var hotel = renderUserDialog(activator, listHotels);
    activator.addEventListener('click', function () {
      isActivePin(activator);
      window.card.renderOfferDialog(hotel);
      openUserDialog(element, cssClass);
    });
    activator.addEventListener('keydown', function (evt) {
      if (window.utils.isActivateEvent(evt)) {
        isActivePin(activator);
        window.card.renderOfferDialog(hotel);
        openUserDialog(element, cssClass);
      }
    });
  };

  return module;
})();
