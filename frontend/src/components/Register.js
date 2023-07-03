import Header from './Header';
import InfoTooltip from './InfoTooltip';
import AuthForm from './AuthForm';
import { useNavigate } from 'react-router-dom';

function Register({
  onRegister,
  isInfoTooltipOpen,
  closeTooltip,
  errorMessage,
  isSuccessRegister,
}) {
  const navigate = useNavigate();

  function handleRegister(email, password) {
    onRegister(email, password);
  }

  return (
    <div className="page">
      <InfoTooltip
        isOpen={isInfoTooltipOpen}
        isSuccess={isSuccessRegister}
        closeTooltip={closeTooltip}
      />
      <Header
        text={'Войти'}
        onClick={() => {
          navigate('/sign-in');
        }}
      />
      <main className="content">
        <h1 className="popup__form-title popup__form-title_type_register">
          Регистрация
        </h1>
        <AuthForm handleSubmit={handleRegister} errorMessage={errorMessage} />
      </main>
    </div>
  );
}

export default Register;
