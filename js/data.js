'use strict';
window.data = (function () {
  var module = {};
  var tokyo = document.querySelector('.tokyo');

  var loadData = function (data, message) {
    var filterResult = [];

    var filterTypeLoge = function functionName() {

    }
    window.pin.renderPins(data);
    window.popup(tokyo, message);
    var clsHidden = 'hidden';
    var offerDialog = tokyo.querySelector('#offer-dialog');
    var dialogClose = offerDialog.querySelector('.dialog__close');
    window.showCard.closeDialogHandler(offerDialog, dialogClose, clsHidden);
    var pins = tokyo.querySelectorAll('.pin:not(.pin__main)');
    pins.forEach(function (pin) {
      window.showCard.openDialogHadler(offerDialog, pin, clsHidden, data);
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
