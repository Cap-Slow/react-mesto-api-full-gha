import PopupWithForm from './PopupWithForm';
import { useRef } from 'react';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {
  const avatarRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      buttonText={isLoading ? 'Сохранение...' : 'Сохранить'}
      onSubmit={handleSubmit}
    >
      <input
        name="avatar-link"
        type="url"
        required
        placeholder="Ссылка на аватар"
        className="popup__input popup__input_field_avatar-link"
        ref={avatarRef}
      />
      <span className="avatar-link-error popup__error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
