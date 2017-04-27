'use strict';

window.load = (function load() {
  var module = {};
  module.loader = function loader(url, successCallBack, errorCallBack) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = 10000;

    var httpStatus = {
      success: 200,
      clientError: 400,
      serverError: 500
    };

    var loadHandler = function loadHendler(request) {
      var status = request.status;
      if (request.readyState === 4) {
        switch (Math.floor(status / 100) * 100) {
          case httpStatus.success:
            if (window.utils.isFunctionCB(successCallBack)) {
              successCallBack.call(window.data, request.response, 'Данные успешно загруженны');
            }
            break;
          case httpStatus.clientError:
            if (window.utils.isFunctionCB(errorCallBack)) {
              errorCallBack('Ошибка клиента! Статус ошибки ' + status);
            }
            break;
          case httpStatus.serverError:
            if (window.utils.isFunctionCB(errorCallBack)) {
              errorCallBack('Ошибка соединения сервера! Статус ошибки ' + status);
            }
            break;
          default:
            if (window.utils.isFunctionCB(errorCallBack)) {
              errorCallBack('Фантастика! Быть такого не может');
            }
        }
      }
    };

    var errorHandler = function () {
      if (window.utils.isFunctionCB(errorCallBack)) {
        errorCallBack('Ошибка соединения с сервером! Попробуйте позднее...');
      }
    };

    var timeoutHandler = function () {
      if (window.utils.isFunctionCB(errorCallBack)) {
        errorCallBack('Ошибка соединения с сервером! Время ожидания ответа на запрос истекло...');
      }
    };

    xhr.addEventListener('load', function () {
      loadHandler(xhr);
    });
    xhr.addEventListener('error', errorHandler);
    xhr.addEventListener('time', timeoutHandler);

    xhr.open('GET', url, true);
    xhr.send();
  };
  return module.loader;
})();
