// src/components/SignupModal.jsx
import React from "react";

const SignupModal = ({
  show,
  t,
  isDarkMode,
  authUsername,
  setAuthUsername,
  authPassword,
  setAuthPassword,
  authConfirmPassword,
  setAuthConfirmPassword,
  authMessage,
  handleSignupSubmit,
  loading,
  setShowSignupModal,
  setShowLoginModal,
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
              <h5 className="modal-title fw-bold">{t("auth.signupTitle")}</h5>
              <button
                type="button"
                className={`btn-close \${isDarkMode ? "btn-close-white" : ""}`}
                aria-label="Close"
                onClick={() => {
                  setShowSignupModal(false);
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
              <form onSubmit={handleSignupSubmit}>
                <div className="mb-3">
                  <label htmlFor="signupUsername" className="form-label">
                    {t("auth.usernameLabel")}
                  </label>
                  <input
                    type="text"
                    className={`form-control form-control-custom \${
                      isDarkMode ? "bg-dark text-light border-secondary" : ""
                    }`}
                    id="signupUsername"
                    value={authUsername}
                    onChange={(e) => setAuthUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="signupPassword" className="form-label">
                    {t("auth.passwordLabel")}
                  </label>
                  <input
                    type="password"
                    className={`form-control form-control-custom \${
                      isDarkMode ? "bg-dark text-light border-secondary" : ""
                    }`}
                    id="signupPassword"
                    value={authPassword}
                    onChange={(e) => setAuthPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label">
                    {t("auth.confirmPasswordLabel")}
                  </label>
                  <input
                    type="password"
                    className={`form-control form-control-custom \${
                      isDarkMode ? "bg-dark text-light border-secondary" : ""
                    }`}
                    id="confirmPassword"
                    value={authConfirmPassword}
                    onChange={(e) => setAuthConfirmPassword(e.target.value)}
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
                      t("buttons.signup")
                    )}
                  </button>
                </div>
                <div className="text-center">
                  <p className="text-muted mb-1">
                    {t("auth.alreadyHaveAccount")}
                  </p>
                  <button
                    type="button"
                    className="btn btn-link text-decoration-none"
                    onClick={() => {
                      setShowSignupModal(false);
                      setShowLoginModal(true);
                      setAuthMessage("");
                    }}
                  >
                    {t("auth.loginInstead")}
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

export default SignupModal;
