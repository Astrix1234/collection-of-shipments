const body = document.querySelector('body');
const startPage = document.createElement('div');
body.append(startPage);

const createStartPage = () => {
  startPage.classList.add('start-page');
  startPage.innerHTML =
    '<h4 class="title">ENVELO</h4><p class="comment">Możesz mieć swoją przesyłkę w kilkanaście sekund.</p><p class="comment">Rozpocznij klikając w przycisk.</p><button type="button" class="btn-start">Odbierz paczkę</button>';
};

createStartPage();

const btnStart = document.querySelector('.btn-start');
const form = document.createElement('form');
startPage.insertAdjacentElement('beforeend', form);

const fillForm = () => {
  btnStart.remove();
  form.innerHTML =
    '<div class="inputs"><label for="user_phone">Numer telefonu<input id="user_phone" type="text" name="phone" pattern="\\d*" title="proszę wpisać 9 cyfr"></label><label for="user_code">Kod odbioru<input id="user_code" type="text" name="code" pattern="\\d*" title="Proszę wpisać 4 cyfry"></label></div><button type="submit" class="btn-submit">Odbierz paczkę</button>';
  const btnSubmit = document.querySelector('.btn-submit');
  btnSubmit.disabled = true;

  const doValidation = () => {
    const phone = document.querySelector('#user_phone');
    const code = document.querySelector('#user_code');
    if (phone.value.length === 9 && code.value.length === 4) {
      btnSubmit.disabled = false;
    }
  };
  const phoneInput = document.querySelector('#user_phone');
  const codeInput = document.querySelector('#user_code');

  phoneInput.addEventListener('input', doValidation);
  codeInput.addEventListener('input', doValidation);
};

btnStart.addEventListener('click', fillForm);
