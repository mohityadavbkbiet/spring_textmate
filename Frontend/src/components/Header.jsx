// src/components/Header.jsx
import React from "react";

const Header = ({
  t,
  selectedLanguage,
  handleLanguageChange,
  isDarkMode,
  toggleDarkMode,
  isLoggedIn,
  handleLogout,
  setShowLoginModal,
  setShowSignupModal,
  setAuthMessage,
}) => {
  return (
    <header className="d-flex flex-column flex-md-row justify-content-between align-items-center py-4 mb-5 border-bottom border-secondary-subtle">
      <h1 className="display-3 fw-bolder text-mate-gradient mb-3 mb-md-0 animate__animated animate__fadeInDown">
        {t("appName")}
      </h1>
      <div className="d-flex align-items-center flex-wrap justify-content-center">
        {/* Language Selector */}
        <div className="dropdown me-3 mb-2 mb-sm-0">
          <select
            id="language-select"
            value={selectedLanguage}
            onChange={handleLanguageChange}
            aria-label={t("buttons.language")}
            className={`form-select form-select-sm rounded-pill px-3 py-2 ${
              isDarkMode ? "bg-dark text-light border-secondary" : "bg-white text-dark border-light"
            }`}
          >
            <option value="en">English</option>
            <option value="hi">हिन्दी</option>
            <option value="es">Español</option>
          </select>
        </div>

        {/* Dark/Light Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className={`btn ${
            isDarkMode ? "btn-outline-light" : "btn-outline-dark"
          } rounded-pill d-flex align-items-center px-3 py-2 me-3 animate__animated animate__fadeIn`}
          aria-label={isDarkMode ? t("buttons.lightMode") : t("buttons.darkMode")}
        >
          {isDarkMode ? (
            <>
              <i className="fas fa-sun me-2"></i>
              <span className="d-none d-sm-inline">{t("buttons.lightMode")}</span>
            </>
          ) : (
            <>
              <i className="fas fa-moon me-2"></i>
              <span className="d-none d-sm-inline">{t("buttons.darkMode")}</span>
            </>
          )}
        </button>

        {/* Login/Logout/Signup Buttons */}
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="btn btn-outline-danger rounded-pill d-flex align-items-center px-3 py-2 animate__animated animate__fadeIn"
            aria-label={t("buttons.logout")}
          >
            <i className="fas fa-sign-out-alt me-2"></i>
            <span className="d-none d-sm-inline">{t("buttons.logout")}</span>
          </button>
        ) : (
          <>
            <button
              onClick={() => {
                setShowLoginModal(true);
                setAuthMessage("");
              }}
              className="btn btn-outline-success rounded-pill d-flex align-items-center px-3 py-2 me-2 animate__animated animate__fadeIn"
              aria-label={t("buttons.login")}
            >
              <i className="fas fa-sign-in-alt me-2"></i>
              <span className="d-none d-sm-inline">{t("buttons.login")}</span>
            </button>
            <button
              onClick={() => {
                setShowSignupModal(true);
                setAuthMessage("");
              }}
              className="btn btn-primary-custom rounded-pill d-flex align-items-center px-3 py-2 animate__animated animate__fadeIn"
              aria-label={t("buttons.signup")}
            >
              <i className="fas fa-user-plus me-2"></i>
              <span className="d-none d-sm-inline">{t("buttons.signup")}</span>
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
