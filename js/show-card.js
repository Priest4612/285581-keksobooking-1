'use strict';

window.showCard = (function () {
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

  module.closeDialogHandler = function closeDialogHandler(element, activator, cssClass) {
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
      if (activator.style.left === (arr[i].location.x - window.constants.pinMiddleX + 'px') && activator.style.top === (arr[i].location.y - window.constants.pinHeight + 'px')) {
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
  var openDialogEvent = function openDialogEvent(activator, lodge, element, cssClass) {
    isActivePin(activator);
    window.card.renderOfferDialog(lodge);
    openUserDialog(element, cssClass);
  };

  module.openDialogHadler = function openDialogHadler(element, activator, cssClass, listHotels) {
    var lodge = renderUserDialog(activator, listHotels);
    activator.addEventListener('click', function openDialog() {
      openDialogEvent(activator, lodge, element, cssClass);
    });
    activator.addEventListener('keydown', function (evt) {
      if (window.utils.isActivateEvent(evt)) {
        openDialogEvent(activator, lodge, element, cssClass);
      }
    });
  };

  module.removeOpenDialigHandler = function removeOpenDialigHandler(element, activator, cssClass, listHotels) {
    var lodge = renderUserDialog(activator, listHotels);
    activator.removeEventListener('click', function openDialog() {
      openDialogEvent(activator, lodge, element, cssClass);
    });
    activator.removeEventListener('keydown', function (evt) {
      if (window.utils.isActivateEvent(evt)) {
        openDialogEvent(activator, lodge, element, cssClass);
      }
    });
  };

  return module;
})();
