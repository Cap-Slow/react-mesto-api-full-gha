import PopupWithForm from './PopupWithForm';
import { useState } from 'react';

function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading }) {
  const [cardName, setCardName] = useState('');
  const [cardLink, setCardLink] = useState('');

  function handleCardNameChange(e) {
    setCardName(e.target.value);
  }

  function handleCardLinkChange(e) {
    setCardLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace(cardName, cardLink);
  }

  return (
    <PopupWithForm
      name="new place"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      buttonText={isLoading ? 'Сохранение...' : 'Создать'}
      onSubmit={handleSubmit}
    >
      <input
        name="card-name"
        type="text"
        required
        placeholder="Название"
        minLength="2"
        maxLength="30"
        className="popup__input popup__input_field_card-name"
        value={cardName}
        onChange={handleCardNameChange}
      />
      <span className="card-name-error popup__error"></span>
      <input
        name="card-link"
        type="url"
        required
        placeholder="Ссылка на картинку"
        className="popup__input popup__input_field_card-link"
        value={cardLink}
        onChange={handleCardLinkChange}
      />
      <span className="card-link-error popup__error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
