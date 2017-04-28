'use strict';
window.data = (function () {
  var module = {};
  var tokyo = document.querySelector('.tokyo');
  var filters = tokyo.querySelector('.tokyo__filters');

  var loadData = function (data, message) {
    var offersShow = 3;
    var filterResult = window.utils.createNewArray(data, offersShow);
    window.pin.renderPins(filterResult);
    var updatePins = function () {
      filterResult = window.filter(data);
      var map = tokyo.querySelector('.tokyo__pin-map');
      window.pin.removePins(map);
      window.pin.renderPins(filterResult);

      var clsHidden = 'hidden';
      var offerDialog = tokyo.querySelector('#offer-dialog');
      var dialogClose = offerDialog.querySelector('.dialog__close');
      window.showCard.closeDialogHandler(offerDialog, dialogClose, clsHidden);
      var pins = tokyo.querySelectorAll('.pin:not(.pin__main)');
      pins.forEach(function (pin) {
        window.showCard.openDialogHadler(offerDialog, pin, clsHidden, filterResult);
      });
    };
    filters.addEventListener('change', function () {
      window.debounce(updatePins, 500);
    });
    window.popup(tokyo, message);
    var clsHidden = 'hidden';
    var offerDialog = tokyo.querySelector('#offer-dialog');
    var dialogClose = offerDialog.querySelector('.dialog__close');
    window.showCard.closeDialogHandler(offerDialog, dialogClose, clsHidden);
    var pins = tokyo.querySelectorAll('.pin:not(.pin__main)');
    pins.forEach(function (pin) {
      window.showCard.openDialogHadler(offerDialog, pin, clsHidden, filterResult);
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
