function ImagePopup({ card, onClose }) {
  return (
    <div
      className={`popup popup_background_dark popup-card ${
        card.link ? 'popup_opened' : ''
      } `}
    >
      <figure className="popup__image-container">
        <img src={card.link} alt={card.name} className="popup__image" />
        <button
          type="button"
          onClick={onClose}
          className="popup__close-button popup__close-image-button"
        ></button>
        <figcaption className="popup__caption">{card.name}</figcaption>
      </figure>
    </div>
  );
}

export default ImagePopup;
