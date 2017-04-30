'use strict';
window.data = (function () {
  var module = {};
  var clsHidden = 'hidden';
  var tokyo = document.querySelector('.tokyo');
  var filters = tokyo.querySelector('.tokyo__filters');
  var map = tokyo.querySelector('.tokyo__pin-map');
  var offerDialog = tokyo.querySelector('#offer-dialog');
  var dialogClose = offerDialog.querySelector('.dialog__close');

  var addEventPins = function addEventPins(data, pins, dialog, close, cssProperty) {
    window.showCard.closeDialogHandler(dialog, close, cssProperty);
    pins.forEach(function (pin) {
      window.showCard.removeOpenDialigHandler(dialog, pin, cssProperty, data);
      window.showCard.openDialogHadler(dialog, pin, cssProperty, data);
    });
  };

  var updatePins = function (parrent, data) {
    var filterResult = window.filter(data);
    var pins = parrent.querySelectorAll('.pin:not(.pin__main)');
    window.pin.removePins(parrent, pins);
    window.pin.renderPins(parrent, filterResult);
    var newPins = parrent.querySelectorAll('.pin:not(.pin__main)');
    addEventPins(filterResult, newPins, offerDialog, dialogClose, clsHidden);
  };

  var loadData = function (data, message) {
    window.popup(tokyo, message);

    var offersShow = 3;
    var startPins = window.utils.createNewArray(data, offersShow);
    window.pin.renderPins(map, startPins);

    var pins = tokyo.querySelectorAll('.pin:not(.pin__main)');
    addEventPins(startPins, pins, offerDialog, dialogClose, clsHidden);

    var update = function () {
      updatePins(map, data);
    };
    filters.addEventListener('change', function () {
      window.debounce(update, 500);
    });
  };

  var loadError = function loadError(message) {
    window.popup(tokyo, message);
  };

  var getLoadData = function getLoadData() {
    var DATA_URL = 'https://intensive-javascript-server-kjgvxfepjl.now.sh/keksobooking/data';
    var load = window.load;
    load(DATA_URL, loadData, loadError);
  };
  module.loadListLodgin = function loadListLodgin() {
    getLoadData();
  };


  return module;
})();
