import PopupWithForm from './PopupWithForm';
import { useState, useContext, useEffect } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser(name, description);
  }

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      buttonText={isLoading ? 'Сохранение...' : 'Сохранить'}
      onSubmit={handleSubmit}
    >
      <input
        name="profile-name"
        type="text"
        required
        placeholder="Введите имя"
        minLength="2"
        maxLength="40"
        className="popup__input popup__input_field_name"
        value={name || ''}
        onChange={handleNameChange}
      />
      <span className="profile-name-error popup__error"></span>
      <input
        name="profile-job"
        type="text"
        required
        placeholder="Введите профессию"
        minLength="2"
        maxLength="200"
        className="popup__input popup__input_field_job"
        value={description || ''}
        onChange={handleDescriptionChange}
      />
      <span className="profile-job-error popup__error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
