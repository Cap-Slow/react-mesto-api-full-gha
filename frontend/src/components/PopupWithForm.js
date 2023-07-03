function PopupWithForm({
  name,
  title,
  isOpen,
  onClose,
  buttonText,
  onSubmit,
  children,
}) {
  return (
    <div className={`popup popup-${name} ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <form
          className="popup__form"
          name={name}
          onSubmit={onSubmit}
          noValidate
        >
          <h2 className="popup__form-title">{title}</h2>
          {children}
          <button className="popup__save-button" type="submit">
            {buttonText}
          </button>
          <button
            onClick={onClose}
            type="reset"
            className={`popup__close-button popup__close-${name}-button`}
          ></button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
