'use strict';

(function () {
  var GET_URL = 'https://gist.githubusercontent.com/nasrulhazim/54b659e43b1035215cd0ba1d4577ee80/raw/e4b495e4f62a650fb0db0405c20fa4f48cb75a0e/quotes.json';
  var XHR_TIMEOUT = 10000;
  var quotes;

  var loadData = function () {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = XHR_TIMEOUT;

    xhr.addEventListener('load', function () {
      quotes = xhr.response.quotes;
      console.log(quotes);
    });

    xhr.addEventListener('error', function () {
      console.error('Connection error');
    });

    xhr.addEventListener('timeout', function () {
      console.error('Could not load the request for ' + xhr.timeout + ' ms');
    });

    xhr.open('GET', GET_URL);
    xhr.send();
  };
  loadData();

})();
