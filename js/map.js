'use strict';

(function () {
  var clsHidden = 'hidden';
  var offerDialog = document.querySelector('#offer-dialog');
  var dialogClose = offerDialog.querySelector('.dialog__close');
  window.openCloseHandler.closeDialog(offerDialog, dialogClose, clsHidden);

  var listHotels = window.generateListHotels();
  window.renderElements.renderPins(listHotels);

  var pins = document.querySelectorAll('.pin');
  for (var i = pins.length; i--;) {
    window.openCloseHandler.openDialog(offerDialog, pins[i], clsHidden, listHotels);
  }
})();
