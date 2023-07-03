import checkMarkIcon from '../images/check-mark-icon.svg';
import crossMarkIcon from '../images/cross-icon.svg';
import { useNavigate } from 'react-router-dom';

function InfoTooltip({ isOpen, closeTooltip, isSuccess }) {
  const navigate = useNavigate();
  function closePopupWithRedirect() {
    closeTooltip();
    if (isSuccess) {
      navigate('/sign-in');
    }
  }

  return (
    <div className={`popup popup-info ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button
          onClick={closePopupWithRedirect}
          type="button"
          className="popup__close-button"
        ></button>
        <div className="popup__tooltip-container">
          <img
            src={isSuccess ? checkMarkIcon : crossMarkIcon}
            alt="Статус регистрации"
            className="popup__tooltip-icon"
          />
          <p className="popup__tooltip-message">
            {isSuccess
              ? 'Вы успешно зарегистрировались!'
              : 'Что-то пошло не так! Попробуйте ещё раз.'}
          </p>
        </div>
      </div>
    </div>
  );
}

export default InfoTooltip;
