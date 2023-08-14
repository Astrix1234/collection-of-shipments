('use strict');

const btnStart = document.querySelector('.btn-start');
const form = document.querySelector('form');

const btnSubmit = document.querySelector('.btn-submit');

const phoneInput = document.querySelector('#user_phone');
const codeInput = document.querySelector('#user_code');

const modal = document.querySelector('.backdrop');
const timeDifference = document.querySelector('.time-difference');

const btnThatsAll = document.querySelector('.btn-thats-all');
const btnTakeAnother = document.querySelector('.btn-take-another');

let timeStart;
let timeEnd;

const goStepOne = () => {
  timeStart = new Date().getTime();
  form.reset();
  form.classList.remove('is-hidden');
  btnStart.classList.add('is-hidden');
};

btnSubmit.disabled = true;

const doValidationForButton = () => {
  if (phoneInput.value.length === 9 && codeInput.value.length === 4) {
    btnSubmit.disabled = false;
  } else {
    btnSubmit.disabled = true;
  }
};

const doValidationLength = (inputElement, expectedLength) => {
  if (inputElement.value.length !== expectedLength) {
    inputElement.style.borderColor = 'red';
    alert(`Proszę wpisać ${expectedLength} cyfr`);
  } else {
    inputElement.style.borderColor = 'grey';
  }
};

const toggleClassModal = () => {
  modal.classList.remove('is-hidden-modal');
  timeEnd = new Date().getTime();
  const differenceTime = (timeEnd - timeStart) / 1000;
  timeDifference.innerHTML = `${differenceTime}`;
};

let data = [];

fetch('./data.json')
  .then(response => response.json())
  .then(jsonData => {
    data = jsonData;
  })
  .catch(error => {
    console.log('Wystąpił błąd ładowania danych', error);
  });

const goStepTwo = evt => {
  evt.preventDefault();

  const sendFormPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      const matchingEntrance = data.find(
        entrance =>
          entrance.phone === phoneInput.value &&
          entrance.code === codeInput.value
      );
      if (!matchingEntrance) {
        if (data.some(entrance => entrance.phone === phoneInput.value)) {
          reject('Niepoprawny kod');
        }
        if (data.some(entrance => entrance.code === codeInput.value)) {
          reject('Nie ma paczki zarejestrowanej na ten numer');
        }
        reject('Nie ma paczki zarejestrowanej na ten numer');
      }
      resolve();
    }, 1000);
  });

  sendFormPromise.then(toggleClassModal).catch(error => {
    alert(error);
  });
};

const goStepZero = () => {
  modal.classList.add('is-hidden-modal');
  form.classList.add('is-hidden');
  btnStart.classList.remove('is-hidden');
};

const goStepOneOnceAgain = () => {
  modal.classList.add('is-hidden-modal');
  goStepOne();
  doValidationForButton();
};

const init = () => {
  btnStart.addEventListener('click', goStepOne);

  phoneInput.addEventListener('input', doValidationForButton);
  codeInput.addEventListener('input', doValidationForButton);

  phoneInput.addEventListener('blur', () => doValidationLength(phoneInput, 9));
  codeInput.addEventListener('blur', () => doValidationLength(codeInput, 4));

  form.addEventListener('submit', goStepTwo);

  btnThatsAll.addEventListener('click', goStepZero);
  btnTakeAnother.addEventListener('click', goStepOneOnceAgain);
};

init();
