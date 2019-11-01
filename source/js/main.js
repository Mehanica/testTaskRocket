'use strict';

var body = document.querySelector('body');
var feedbackButton = body.querySelector('.page-header__callback-button');
var popup = body.querySelector('.pop-up');
var closeButton = popup.querySelector('.pop-up__close');
var overlay = body.querySelector('.overlay');
var form = popup.querySelector('.pop-up__form');
var footerTitles = body.querySelectorAll('.page-footer h3');
var PhoneField = document.getElementsByName('tel');


if (feedbackButton && popup && closeButton && overlay && form && body && PhoneField && footerTitles) {
  footerTitles.forEach(function (title) {
    title.addEventListener('click', function () {
      title.classList.toggle('jsFooterTitleOpened');
    });
  });

  var feedBackButtonClickHandler = function (evt) {
    evt.preventDefault();
    overlay.classList.add('overlay--active');
    popup.classList.add('pop-up--active');
    body.classList.add('no-scroll');
  };

  feedbackButton.addEventListener('click', feedBackButtonClickHandler);

  var closeButtonClickHandler = function () {
    popup.classList.remove('pop-up--active');
    overlay.classList.remove('overlay--active');
    body.classList.remove('no-scroll');
  };

  var escKeydownHandler = function (evt) {
    if (evt.keyCode === 27) {
      evt.preventDefault();

      if (popup.classList.contains('pop-up--active')) {
        popup.classList.remove('pop-up--active');
        overlay.classList.remove('overlay--active');
        body.classList.remove('no-scroll');
      }
    }
  };

  var overlayClickHandler = function (evt) {
    evt.preventDefault();
    overlay.classList.remove('overlay--active');
    popup.classList.remove('pop-up--active');
    body.classList.remove('no-scroll');
  };

  closeButton.addEventListener('click', closeButtonClickHandler);
  window.addEventListener('keydown', escKeydownHandler);
  overlay.addEventListener('click', overlayClickHandler);

  var formChangeHandler = function () {
    var json = JSON.stringify(Array.from(new FormData(form)));
    localStorage.setItem(form.id, json);
  };

  form.addEventListener('change', formChangeHandler);

  document.addEventListener('DOMContentLoaded', function () {
    var values = JSON.parse(localStorage.getItem(form.id));

    if (values) {
      for (var i = 0; i < values.length; ++i) {
        var element = form[values[i][0]];
        element.value = values[i][1];
      }
    }
  });

  var maskOptions = {
    mask: '+{7}(000)000-00-00'
  };

  [].forEach.call(PhoneField, function (element) {
    var mask = IMask(element, maskOptions);
  });
}

