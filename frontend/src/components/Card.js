import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { useContext } from 'react';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `elements__like-button ${
    isLiked && 'elements__like-button_active'
  }`;
  function handleCardClick() {
    onCardClick(card);
  }
  function handleLikeClick() {
    onCardLike(card);
  }
  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <li className="elements__item">
      <img
        src={card.link}
        alt={card.name}
        className="elements__image"
        onClick={handleCardClick}
      />
      {isOwn && (
        <button
          type="button"
          className="elements__delete-button elements__delete-button_visible"
          onClick={handleDeleteClick}
        ></button>
      )}
      <div className="elements__card-profile">
        <h3 className="elements__title">{card.name}</h3>
        <div className="elements__like-container">
          <button
            type="button"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          ></button>
          <p className="elements__like-counter">{card.likes.length}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;
