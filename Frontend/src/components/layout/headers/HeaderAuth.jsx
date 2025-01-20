import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./HeaderAuth.css";

const HeaderAuth = () => {
  const [activeMobileMenu, setActiveMobileMenu] = useState(false);
  const isLoggedIn = sessionStorage.getItem('authenticatedUser');
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    sessionStorage.removeItem('authenticatedUser');
    navigate('/login');
  };

  return (
    <header className="header-auth">
      <div className="header-auth__container">
        <div className="header-auth__logo">
          <Link to="/">
            <img src="/assets/img/custom/logo.png" alt="logo" className="header-auth__logo-img" />
          </Link>
        </div>

        <nav className={`header-auth__nav ${activeMobileMenu ? 'is-active' : ''}`}>
          <ul className="header-auth__menu">
            <li className="header-auth__menu-item">
              <Link 
                to="/" 
                className={`header-auth__menu-link ${location.pathname === '/' ? 'active' : ''}`}
              >
                Home
              </Link>
            </li>
            
            {isLoggedIn && (
              <li className="header-auth__menu-item">
                <Link 
                  to="/reservations" 
                  className={`header-auth__menu-link ${location.pathname === '/reservations' ? 'active' : ''}`}
                >
                  Mes Demandes
                </Link>
              </li>
            )}
            
          </ul>
        </nav>

        <div className="header-auth__actions">
          {isLoggedIn ? (
            <button 
              onClick={handleLogout}
              className="header-auth__button header-auth__button--logout"
            >
              Logout
            </button>
          ) : (
            <div className="header-auth__auth-buttons">
              <Link to="/login" className="header-auth__button header-auth__button--login">
                Login
              </Link>
              <Link to="/signup" className="header-auth__button header-auth__button--signup">
                Sign Up
              </Link>
            </div>
          )}

          <button 
            className="header-auth__mobile-toggle"
            onClick={() => setActiveMobileMenu(!activeMobileMenu)}
            aria-label="Toggle mobile menu"
          >
            <span className="header-auth__mobile-icon"></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default HeaderAuth;