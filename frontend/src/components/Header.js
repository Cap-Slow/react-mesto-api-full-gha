import logoPath from '../images/logo.svg';
function Header({ userEmail, text, onClick }) {
  return (
    <header className="header">
      <img
        src={logoPath}
        alt="Логотип проекта Mesto"
        className="header__logo"
      />
      <div className="header__nav-container">
        {userEmail} && <p className="header__email">{userEmail}</p>
        <a onClick={onClick} className="header__link">
          {text}
        </a>
      </div>
    </header>
  );
}

export default Header;
