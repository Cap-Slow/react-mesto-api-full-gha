import { useState } from 'react';

function AuthForm({ handleSubmit, errorMessage }) {
  const [formValue, setFormValue] = useState({
    email: '',
    password: '',
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  }

  function handleFormSubmit(e) {
    const { email, password } = formValue;
    e.preventDefault();
    handleSubmit(email, password);
  }

  return (
    <form className="popup__form" onSubmit={handleFormSubmit}>
      <input
        type="email"
        name="email"
        placeholder="Email"
        className="popup__input popup__input_theme_dark"
        required
        onChange={handleChange}
        value={formValue.email || ''}
      />
      <span className="email-error popup__error"></span>
      <input
        type="password"
        name="password"
        placeholder="Пароль"
        className="popup__input popup__input_theme_dark"
        required
        onChange={handleChange}
        value={formValue.password || ''}
      />
      <span className="password-error popup__error"></span>
      <p className="register__text register__text_type_error">{errorMessage}</p>
      <button
        type="submit"
        className="popup__save-button popup__save-button_type_register"
      >
        Войти
      </button>
    </form>
  );
}

export default AuthForm;
