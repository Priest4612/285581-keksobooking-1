'use strict';

(function () {

  window.popup = function (parentNode, messageText) {
    var message = document.createElement('div');
    var style = message.style;

    message.innerHTML = messageText;
    message.className = 'popup';

    style.position = 'absolute';
    style.top = '25px';
    style.left = '25px';
    style.maxWidth = '350px';
    style.minWidth = '150px';
    style.height = 'auto';
    style.zIndex = '999';

    style.opacity = '0';
    style.transition = 'opacity 300ms linear';
    style.userSelect = 'none';
    style.cursor = 'default';

    style.padding = '10px';

    style.borderLeft = '5px solid #ff6d51';

    style.background = '#fff';

    style.fontWeight = 'bold';
    style.fontSize = '12px';

    parentNode.appendChild(message);

    setTimeout(function () {
      document.querySelector('.popup').style.opacity = '1';
    }, 300);

    setTimeout(function () {
      document.querySelector('.popup').style.opacity = '0';
    }, 3300);

    setTimeout(function () {
      parentNode.removeChild(message);
    }, 3600);
  };

})();
