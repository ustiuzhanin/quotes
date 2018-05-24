'use strict';

/*
  quotes loading
*/

(function () {

  window.load = function (onLoad, onError) {
    var GET_URL = 'https://gist.githubusercontent.com/nasrulhazim/54b659e43b1035215cd0ba1d4577ee80/raw/e4b495e4f62a650fb0db0405c20fa4f48cb75a0e/quotes.json';
    var XHR_TIMEOUT = 10000;

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = XHR_TIMEOUT;

    xhr.addEventListener('load', function () {
      if(xhr.status === 200) {
        onLoad(xhr.response.quotes);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Connection error');
    });

    xhr.addEventListener('timeout', function () {
      onError('Could not load the request for ' + xhr.timeout + ' ms');
    });

    xhr.open('GET', GET_URL);
    xhr.send();
  };

})();

(function () {

/*
  btn handler
*/

  var quoteBtn = document.querySelector('.quote__btn');
  var quoteText = document.querySelector('.quote__text');
  var quoteAuthor = document.querySelector('.quote__author');
  var twitter = document.querySelector('.social__twitter');
  console.log(twitter);

  var quotes;

  var getRandomNumber = function (max) {
    return Math.floor(Math.random() * (max - 1)) + 1;
  };

  var renderQuote = function () {
    var randomQuote = quotes[getRandomNumber(quotes.length)];

    quoteText.textContent = randomQuote.quote;
    quoteAuthor.textContent = randomQuote.author;

    generateTwitterLink(randomQuote.quote, randomQuote.author);
  }

  var generateTwitterLink = function (quote, author) {
    var encodeText = encodeURIComponent('"' + quote + '"');
    var encodeAuthor = encodeURIComponent(author);
    twitter.href = 'https://twitter.com/intent/tweet?text=' + encodeText + '%20' + encodeAuthor;
  }

  var onBtnClick = function (evt) {
    evt.preventDefault();
    renderQuote();
  };

  quoteBtn.addEventListener('click', onBtnClick);

/*
  quotes loading
*/

  var onError = function (message) {
    console.error(message);
  };

  var onSuccess = function (data) {
    quotes = data;
    renderQuote();
  };

  window.load(onSuccess, onError);

})();
