'use strict';

var feedbackButton = document.querySelector('.page-header__callback-button');
var popup = document.querySelector('.pop-up');
var closeButton = popup.querySelector('.pop-up__close');
var overlay = document.querySelector('.overlay');
var form = popup.querySelector('.pop-up__form');
var footerTitles = document.querySelectorAll('.page-footer h3');
var phoneFields = document.getElementsByName('tel');
var advantagesScrollLink = document.querySelector('.promo-content__button-scroll');
var feedbackScrollLink = document.querySelector('.promo-content__button');

var feedBackButtonClickHandler = function (evt) {
  evt.preventDefault();
  openFormPopup();
};

var closeButtonClickHandler = function () {
  closeFormPopup();
};

var escKeydownHandler = function (evt) {
  if (evt.keyCode === 27) {
    evt.preventDefault();

    if (popup.classList.contains('pop-up--active')) {
      closeFormPopup();
    }
  }
};

var overlayClickHandler = function (evt) {
  evt.preventDefault();
  closeFormPopup();
};

if (feedbackButton) {
  feedbackButton.addEventListener('click', feedBackButtonClickHandler);
}

if (closeButton) {
  closeButton.addEventListener('click', closeButtonClickHandler);
}

if (popup && overlay) {
  var closeFormPopup = function () {
    popup.classList.remove('pop-up--active');
    overlay.classList.remove('overlay--active');
    document.body.classList.remove('no-scroll');
  };

  var openFormPopup = function () {
    overlay.classList.add('overlay--active');
    popup.classList.add('pop-up--active');
    document.body.classList.add('no-scroll');
  };

  window.addEventListener('keydown', escKeydownHandler);
  overlay.addEventListener('click', overlayClickHandler);
}

if (form) {
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
}

if (footerTitles[0] && footerTitles[1]) {
  footerTitles[0].addEventListener('click', function () {
    footerTitles[1].classList.remove('jsFooterTitleOpened');
    footerTitles[0].classList.toggle('jsFooterTitleOpened');
  });

  footerTitles[1].addEventListener('click', function () {
    footerTitles[0].classList.remove('jsFooterTitleOpened');
    footerTitles[1].classList.toggle('jsFooterTitleOpened');
  });
}

if (advantagesScrollLink) {
  advantagesScrollLink.addEventListener('click', function (e) {
    e.preventDefault();
    document.getElementById('advantages').scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  });
}

if (feedbackScrollLink) {
  feedbackScrollLink.addEventListener('click', function (e) {
    e.preventDefault();
    document.getElementById('feedback').scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  });
}

[].forEach.call(phoneFields, function (element) {
  element.addEventListener('invalid', function () {
    element.setCustomValidity('Введите данные формата: +7 (ХХХ) ХХХ-ХХ-ХХ');
    console.log(element.value);
  });
  element.addEventListener('valid', function () {
    element.setCustomValidity('');
  });
});

/* eslint-disable */

var maskOptions = {
  mask: '+{7} (000) 000-00-00'
};

[].forEach.call(phoneFields, function (element) {
  var mask = IMask(element, maskOptions);
});

/* eslint-enable */
