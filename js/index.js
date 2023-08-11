/* eslint-disable no-undef */
'use strict';

const btnStart = document.querySelector('.btn-start');
const form = document.querySelector('form');

const btnSubmit = document.querySelector('.btn-submit');

const phoneInput = document.querySelector('#user_phone');
const codeInput = document.querySelector('#user_code');

const modal = document.querySelector('.backdrop');

const btnThatsAll = document.querySelector('.btn-thats-all');
const btnTakeAnother = document.querySelector('.btn-take-another');

const goStepOne = () => {
  form.reset();
  form.classList.remove('is-hidden');
  btnStart.classList.add('is-hidden');
};

btnStart.addEventListener('click', goStepOne);

btnSubmit.disabled = true;

const doValidationForButton = () => {
  if (phoneInput.value.length === 9 && codeInput.value.length === 4) {
    btnSubmit.disabled = false;
  } else {
    btnSubmit.disabled = true;
  }
};

phoneInput.addEventListener('input', doValidationForButton);
codeInput.addEventListener('input', doValidationForButton);

const doValidationForPhone = () => {
  if (phoneInput.value.length !== 9) {
    phoneInput.style.borderColor = 'red';
    Notiflix.Notify.failure('Proszę wpisać 9 cyfr');
  } else {
    phoneInput.style.borderColor = 'grey';
  }
};
const doValidationForCode = () => {
  if (codeInput.value.length !== 4) {
    codeInput.style.borderColor = 'red';
    Notiflix.Notify.failure('Proszę wpisać 4 cyfry');
  } else {
    codeInput.style.borderColor = 'grey';
  }
};

phoneInput.addEventListener('blur', doValidationForPhone);
codeInput.addEventListener('blur', doValidationForCode);

const toggleClassModal = () => {
  modal.classList.remove('is-hidden-modal');
};

const goStepTwo = evt => {
  evt.preventDefault();

  const sendFormPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve();
      } else {
        reject(
          'Niestety nie znaleźliśmy paczki o takim numerze kodu lub dla takiego numeru telefonu'
        );
      }
    }, 1000);
  });

  sendFormPromise
    .then(toggleClassModal)
    .catch(error => Notiflix.Notify.failure(error));
};

form.addEventListener('submit', goStepTwo);

const goStepZero = () => {
  modal.classList.add('is-hidden-modal');
  form.classList.add('is-hidden');
  btnStart.classList.remove('is-hidden');
};

const goStepOneOnceAgain = () => {
  modal.classList.add('is-hidden-modal');
  goStepOne();
  doValidationForButton();
  doValidationForCode();
  doValidationForPhone();
};

btnThatsAll.addEventListener('click', goStepZero);
btnTakeAnother.addEventListener('click', goStepOneOnceAgain);
