import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ProtectedRoute from './ProtectedRoute';
import Register from './Register';
import Login from './Login';
import api from '../utils/Api';
import { register, authorize, getContent } from '../utils/Auth';
import { useState, useEffect } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { Route, Routes, useNavigate, Navigate } from 'react-router-dom';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSuccessRegister, setIsSuccessRegister] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userInfo, cards]) => {
        setCurrentUser(userInfo);
        setCards(cards);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    getContent()
      .then((response) => {
        if (response) {
          setLoggedIn(true);
          setUserEmail(response.email);
          navigate('/');
        } else {
          setLoggedIn(false);
        }
      })
      .catch((error) => {
        console.log(error);
        setLoggedIn(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onLogin(email, password) {
    authorize(email, password)
      .then(() => {
        setLoggedIn(true);
        setUserEmail(email);
        navigate('/');
        setErrorMessage('');
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage(error);
        setIsInfoTooltipOpen(true);
      });
  }

  function onRegister(email, password) {
    setIsInfoTooltipOpen(true);
    register(email, password)
      .then(() => {
        setIsSuccessRegister(true);
        setErrorMessage('');
      })
      .catch((error) => {
        setErrorMessage(error);
        setIsSuccessRegister(false);
      });
  }

  function onSignOut() {
    localStorage.removeItem('jwt');
    navigate('/sign-in');
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({});
    setIsInfoTooltipOpen(false);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);
    console.log(isLiked);
    api
      .toggleLike(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateUser(name, about) {
    setIsLoading(true);
    api
      .setUserInfo(name, about)
      .then((userInfo) => {
        setCurrentUser(userInfo);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUpdateAvatar({ avatar }) {
    setIsLoading(true);
    api
      .setUserAvatar(avatar)
      .then((userInfo) => {
        setCurrentUser(userInfo);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleAddPlaceSubmit(name, link) {
    setIsLoading(true);
    api
      .addCard(name, link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  if (isLoggedIn === null) {
    return (
      <div className="loading">
        <p className="loading__text">Loading...</p>
      </div>
    );
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Routes>
        <Route
          path="/sign-up"
          element={
            <Register
              onRegister={onRegister}
              isInfoTooltipOpen={isInfoTooltipOpen}
              closeTooltip={closeAllPopups}
              errorMessage={errorMessage}
              isSuccessRegister={isSuccessRegister}
            />
          }
        />
        <Route
          path="/sign-in"
          element={
            <Login
              onLogin={onLogin}
              errorMessage={errorMessage}
              isInfoTooltipOpen={isInfoTooltipOpen}
              closeTooltip={closeAllPopups}
            />
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute
              isLoggedIn={isLoggedIn}
              element={
                <div className="page">
                  <Header
                    userEmail={userEmail}
                    text={'Выйти'}
                    onClick={onSignOut}
                  />
                  <Main
                    onEditAvatar={handleEditAvatarClick}
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onCardClick={handleCardClick}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                    cards={cards}
                  />
                  <Footer />
                  <EditProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                    onUpdateUser={handleUpdateUser}
                    isLoading={isLoading}
                  />
                  <AddPlacePopup
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                    onAddPlace={handleAddPlaceSubmit}
                    isLoading={isLoading}
                  />
                  <EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                    onUpdateAvatar={handleUpdateAvatar}
                    isLoading={isLoading}
                  />
                  <ImagePopup card={selectedCard} onClose={closeAllPopups} />
                  <PopupWithForm
                    name="confirm"
                    title="Вы уверены?"
                    buttonText="Да"
                  />
                </div>
              }
            />
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </CurrentUserContext.Provider>
  );
}

export default App;
