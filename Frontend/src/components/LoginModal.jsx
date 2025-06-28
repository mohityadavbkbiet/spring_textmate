// src/components/LoginModal.jsx
import React from "react";

const LoginModal = ({
  show,
  t,
  isDarkMode,
  authUsername,
  setAuthUsername,
  authPassword,
  setAuthPassword,
  authMessage,
  handleLoginSubmit,
  loading,
  setShowLoginModal,
  setShowSignupModal,
  setAuthMessage,
}) => {
  if (!show) return null;

  return (
    <>
      <div
        className={`modal fade \${show ? "show d-block" : ""}`}
        tabIndex="-1"
        role="dialog"
        aria-hidden={!show}
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div
            className={`modal-content card-custom \${
              isDarkMode ? "bg-secondary text-light" : "bg-white text-dark"
            }`}
          >
            <div className="modal-header border-0">
              <h5 className="modal-title fw-bold">{t("auth.loginTitle")}</h5>
              <button
                type="button"
                className={`btn-close \${isDarkMode ? "btn-close-white" : ""}`}
                aria-label="Close"
                onClick={() => {
                  setShowLoginModal(false);
                  setAuthMessage("");
                }}
              ></button>
            </div>
            <div className="modal-body">
              {authMessage && (
                <div className="alert alert-info py-2" role="alert">
                  {authMessage}
                </div>
              )}
              <form onSubmit={handleLoginSubmit}>
                <div className="mb-3">
                  <label htmlFor="loginUsername" className="form-label">
                    {t("auth.usernameLabel")}
                  </label>
                  <input
                    type="text"
                    className={`form-control form-control-custom \${
                      isDarkMode ? "bg-dark text-light border-secondary" : ""
                    }`}
                    id="loginUsername"
                    value={authUsername}
                    onChange={(e) => setAuthUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="loginPassword" className="form-label">
                    {t("auth.passwordLabel")}
                  </label>
                  <input
                    type="password"
                    className={`form-control form-control-custom \${
                      isDarkMode ? "bg-dark text-light border-secondary" : ""
                    }`}
                    id="loginPassword"
                    value={authPassword}
                    onChange={(e) => setAuthPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="d-grid gap-2 mb-3">
                  <button
                    type="submit"
                    className="btn btn-primary-custom text-white"
                    disabled={loading}
                  >
                    {loading ? (
                      <span
                        className="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      ></span>
                    ) : (
                      t("buttons.login")
                    )}
                  </button>
                </div>
                <div className="text-center">
                  <p className="text-muted mb-1">
                    {t("auth.dontHaveAccount")}
                  </p>
                  <button
                    type="button"
                    className="btn btn-link text-decoration-none"
                    onClick={() => {
                      setShowLoginModal(false);
                      setShowSignupModal(true);
                      setAuthMessage("");
                    }}
                  >
                    {t("auth.signupInstead")}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {show && <div className="modal-backdrop fade show"></div>}
    </>
  );
};

export default LoginModal;
