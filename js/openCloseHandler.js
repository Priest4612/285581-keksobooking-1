'use strict';

window.openCloseHandler = (function () {
  var module = {};

  var cssClassActive = 'pin--active';
  var currentActivePin;

  var isKeydownHandlerEsc = function (evt, element, cssClass) {
    if (window.utils.isDeactivateEvent(evt)) {
      closeUserDialog(element, cssClass);
    }
  };

  var closeUserDialog = function (element, cssClass) {
    element.classList.add(cssClass);
    currentActivePin.classList.remove(cssClassActive);
    document.removeEventListener('keydown', function (evt) {
      isKeydownHandlerEsc(evt, element, cssClass);
    });
  };

  module.closeDialog = function (element, activator, cssClass) {
    activator.addEventListener('click', function () {
      closeUserDialog(element, cssClass);
    });
    activator.addEventListener('keydown', function (evt) {
      if (window.utils.isActivateEvent(evt)) {
        closeUserDialog(element, cssClass);
      }
    });
  };


  var openUserDialog = function (element, cssClass) {
    element.classList.remove(cssClass);
    document.addEventListener('keydown', function (evt) {
      isKeydownHandlerEsc(evt, element, cssClass);
    });
  };

  var renderUserDialog = function (activator, arr) {
    var index = 0;

    // console.log(image.src.slice(2, -4));
    for (var i = 0; i < arr.length; i++) {
      if (activator.style.left === (arr[i].location.x + 'px') && activator.style.top === (arr[i].location.y + 'px')) {
        index = i;
      }
    }
    return arr[index];
  };

  var isActivePin = function (activator) {
    if (currentActivePin) {
      currentActivePin.classList.remove(cssClassActive);
    }
    currentActivePin = activator;
    activator.classList.add(cssClassActive);
  };

  module.openDialog = function (element, activator, cssClass, listHotels) {
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
