('use strict');

const btnStart = document.querySelector('.btn-start');
const form = document.querySelector('form');

const btnSubmit = document.querySelector('.btn-submit');

const phoneInput = document.querySelector('#user_phone');
const codeInput = document.querySelector('#user_code');

const modal = document.querySelector('.backdrop');
const modalComments = document.querySelector('.modal-comments');

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
    alert('Proszę wpisać 9 cyfr');
  } else {
    phoneInput.style.borderColor = 'grey';
  }
};
const doValidationForCode = () => {
  if (codeInput.value.length !== 4) {
    codeInput.style.borderColor = 'red';
    alert('Proszę wpisać 4 cyfry');
  } else {
    codeInput.style.borderColor = 'grey';
  }
};

phoneInput.addEventListener('blur', doValidationForPhone);
codeInput.addEventListener('blur', doValidationForCode);

const toggleClassModal = () => {
  modal.classList.remove('is-hidden-modal');
  timeEnd = new Date().getTime();
  const differenceTime = (timeEnd - timeStart) / 1000;
  modalComments.innerHTML = '';
  const modalText = `<p class="receipt">Paczka odebrana!</p>
      <p class="comment-receipt">Zrobiłeś to w czasie ${differenceTime} sekund! Czy możemy zrobić dla Ciebie coś jeszcze?</p>`;
  modalComments.innerHTML = modalText;
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
        } else if (data.some(entrance => entrance.code === codeInput.value)) {
          reject('Nie ma paczki zarejestrowanej na ten numer');
        } else {
          reject('Nie ma paczki zarejestrowanej na ten numer');
        }
      } else {
        resolve();
      }
    }, 1000);
  });

  sendFormPromise.then(toggleClassModal).catch(error => {
    alert(error);
  });
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
};

btnThatsAll.addEventListener('click', goStepZero);
btnTakeAnother.addEventListener('click', goStepOneOnceAgain);
