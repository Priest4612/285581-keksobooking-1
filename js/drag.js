'use strict';

window.drag = (function () {
  var module = {};

  module.moveElement = function drag(dragElement, dragArea, offsetBottom, offsetTop, address) {
    dragElement.addEventListener('mousedown', function (evt) {
      evt.preventDefault();
      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };
      var onMouseMove = function onMouseMove(moveEvt) {
        moveEvt.preventDefault();

        var moveTop = function moveTop(coordsY) {
          if (dragElement.offsetTop - coordsY + dragElement.offsetHeight < dragArea.offsetHeight - offsetBottom && dragElement.offsetTop - coordsY + dragElement.offsetHeight > offsetTop) {
            dragElement.style.top = (dragElement.offsetTop - coordsY) + 'px';
          }
        };
        var moveLeft = function moveLext(coordsX) {
          if (dragElement.offsetLeft - coordsX + dragElement.offsetWidth < dragArea.offsetWidth && dragElement.offsetLeft - coordsX > 0) {
            dragElement.style.left = (dragElement.offsetLeft - shift.x) + 'px';
          }
        };
        var setInputAddress = function setInputAddress() {
          address.value = 'X: ' + (dragElement.offsetLeft + dragElement.offsetWidth / 2) + '; Y: ' + (dragElement.offsetTop + dragElement.offsetHeight);
        };


        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };
        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        moveTop(shift.y);
        moveLeft(shift.x);
        setInputAddress();
      };
      var onMouseUp = function onMouseUp(upEvt) {
        upEvt.preventDefault();
        dragArea.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };
      dragArea.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  };


  return module;
})();
