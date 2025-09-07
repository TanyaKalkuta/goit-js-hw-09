const formData = {
  email: '',
  message: '',
};

const localStorageKey = 'feedback-form-state';

const form = document.querySelector('.feedback-form');
const { email, message } = form.elements;

function populateTextArea() {
  try {
    const storageValue =
      JSON.parse(localStorage.getItem(localStorageKey)) || {};

    formData.email = storageValue.email || '';
    formData.message = storageValue.message || '';

    email.value = formData.email;
    message.value = formData.message;
  } catch (error) {
    console.warn('Некоректні дані у localStorage:', error.message);
    localStorage.removeItem(localStorageKey); // видаляємо сміття
  }
}

populateTextArea();

form.addEventListener('input', hendleInput);

function hendleInput(event) {
  const { name, value } = event.target;

  if (!(name in formData)) return; // реагуємо тільки на email/message
  formData[name] = value;
  localStorage.setItem(localStorageKey, JSON.stringify(formData));
}

form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();

  const current = {
    email: email.value.trim(),
    message: message.value.trim(),
  };

  if (!current.email || !current.message) {
    alert('Fill please all fields');
    return;
  }

  console.log(current); // ← виводимо актуальні дані

  localStorage.removeItem(localStorageKey); // чистимо storage
  form.reset(); // чистимо форму
  formData.email = '';
  formData.message = '';
}
