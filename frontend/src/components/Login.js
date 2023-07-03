import Header from './Header';
import InfoTooltip from './InfoTooltip';
import AuthForm from './AuthForm';
import { useNavigate } from 'react-router-dom';

function Login({ onLogin, errorMessage, isInfoTooltipOpen, closeTooltip }) {
  const navigate = useNavigate();

  function handleLogin(email, password) {
    onLogin(email, password);
  }

  return (
    <div className="page">
      <InfoTooltip
        isOpen={isInfoTooltipOpen}
        isSuccess={false}
        closeTooltip={closeTooltip}
      />
      <Header
        onClick={() => {
          navigate('/sign-up');
        }}
        text={'Регистрация'}
      />
      <main className="content"></main>
      <h1 className="popup__form-title popup__form-title_type_register">
        Вход
      </h1>
      <AuthForm handleSubmit={handleLogin} errorMessage={errorMessage} />
    </div>
  );
}

export default Login;
