'use strict';

var callbackButton = document.querySelector('.page-header__callback-button');
var popup = document.querySelector('.pop-up');
var closeButton = popup.querySelector('.pop-up__close');
var overlay = document.querySelector('.overlay');
var form = popup.querySelector('.pop-up__form');

var callBackButtonClickHandler = function (evt) {
  evt.preventDefault();
  overlay.classList.add('overlay--active');
  popup.classList.add('pop-up--active');
};

callbackButton.addEventListener('click', callBackButtonClickHandler);

var closeButtonClickHandler = function () {
  popup.classList.remove('pop-up--active');
  overlay.classList.remove('overlay--active');
};

var escKeydownHandler = function (evt) {
  if (evt.keyCode === 27) {
    evt.preventDefault();

    if (popup.classList.contains('pop-up--active')) {
      popup.classList.remove('pop-up--active');
      overlay.classList.remove('overlay--active');
    }
  }
};

var overlayClickHandler = function (evt) {
  evt.preventDefault();
  overlay.classList.remove('overlay--active');
  popup.classList.remove('pop-up--active');
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
