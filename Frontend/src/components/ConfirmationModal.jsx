// src/components/ConfirmationModal.jsx
import React from "react";

const ConfirmationModal = ({ show, t, isDarkMode, confirmClear, cancelClear }) => {
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
            <div className="modal-header border-0 pb-0">
              <h5 className="modal-title fw-bold">
                {t("messages.modalTitle")}
              </h5>
              <button
                type="button"
                className={`btn-close \${isDarkMode ? "btn-close-white" : ""}`}
                aria-label="Close"
                onClick={cancelClear}
              ></button>
            </div>
            <div className="modal-body text-muted pt-0">
              {t("messages.modalClearTextContent")}
            </div>
            <div className="modal-footer border-0 pt-0">
              <button
                type="button"
                className="btn btn-outline-secondary rounded-pill px-4"
                onClick={cancelClear}
              >
                {t("buttons.close")}
              </button>
              <button
                type="button"
                className="btn btn-danger-custom rounded-pill px-4 text-white"
                onClick={confirmClear}
              >
                {t("buttons.confirm")}
              </button>
            </div>
          </div>
        </div>
      </div>
      {show && <div className="modal-backdrop fade show"></div>}
    </>
  );
};

export default ConfirmationModal;
