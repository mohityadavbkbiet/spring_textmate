// src/components/TextEditor.jsx
import React, { useRef } from "react";

const TextEditor = ({
  t,
  text,
  transformedText,
  handleOnChange,
  handleUpperCase,
  handleLowerCase,
  handleTitleCase,
  handleReverseText,
  handleCopyText,
  handleClearText,
  loading,
  message,
  error,
  isDarkMode,
}) => {
  const textAreaRef = useRef(null); // Ref for textarea

  return (
    <>
      <section className="text-center mb-5 animate__animated animate__fadeInUp">
        <p className="lead text-muted fst-italic mb-4">{t("heroSubtitle")}</p>
      </section>

      {/* Text Input Section */}
      <div className="mb-5">
        <label htmlFor="text-area" className="form-label h4 text-primary mb-3 fw-bold">
          Input Text
        </label>
        <textarea
          ref={textAreaRef}
          id="text-area"
          className={`form-control form-control-custom ${
            isDarkMode ? "bg-dark text-light border-secondary" : ""
          }`}
          value={text}
          onChange={handleOnChange}
          placeholder={t("placeholder")}
          rows="10"
          aria-label="Text input area for analysis and transformation"
        ></textarea>
      </div>

      {/* Action Buttons Section */}
      <div className="row g-3 mb-5 justify-content-center btn-group-mobile-stack">
        <div className="col-6 col-md-4 col-lg-2">
          <button
            onClick={handleUpperCase}
            className="btn btn-primary-custom w-100 text-white"
            disabled={loading}
            aria-label={t("buttons.uppercase")}
          >
            {loading ? (
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            ) : (
              t("buttons.uppercase")
            )}
          </button>
        </div>
        <div className="col-6 col-md-4 col-lg-2">
          <button
            onClick={handleLowerCase}
            className="btn btn-primary-custom w-100 text-white"
            disabled={loading}
            aria-label={t("buttons.lowercase")}
          >
            {loading ? (
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            ) : (
              t("buttons.lowercase")
            )}
          </button>
        </div>
        <div className="col-6 col-md-4 col-lg-2">
          <button
            onClick={handleTitleCase}
            className="btn btn-primary-custom w-100 text-white"
            disabled={loading}
            aria-label={t("buttons.titlecase")}
          >
            {loading ? (
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            ) : (
              t("buttons.titlecase")
            )}
          </button>
        </div>
        <div className="col-6 col-md-4 col-lg-2">
          <button
            onClick={handleReverseText}
            className="btn btn-primary-custom w-100 text-white"
            disabled={loading}
            aria-label={t("buttons.reverse")}
          >
            {loading ? (
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            ) : (
              t("buttons.reverse")
            )}
          </button>
        </div>
        <div className="col-6 col-md-4 col-lg-2">
          <button
            onClick={() => handleCopyText(textAreaRef)} // Pass ref here
            className="btn btn-outline-primary-custom w-100"
            aria-label={t("buttons.copy")}
          >
            {t("buttons.copy")}
          </button>
        </div>
        <div className="col-6 col-md-4 col-lg-2">
          <button
            onClick={handleClearText}
            className="btn btn-danger-custom w-100 text-white"
            aria-label={t("buttons.clear")}
          >
            {t("buttons.clear")}
          </button>
        </div>
      </div>

      {/* Messages and Errors Display */}
      {loading && (
        <div className="text-center py-3 mb-4 text-primary animate-pulse" role="status" aria-live="polite">
          <div className="spinner-grow text-primary me-2" role="status">
            <span className="visually-hidden">{t("messages.loading")}</span>
          </div>
          <span className="fw-bold">{t("messages.loading")}</span>
        </div>
      )}
      {message && (
        <div
          className="alert alert-info border-0 rounded-3 shadow-sm animate__animated animate__fadeInDown px-4 py-3"
          role="alert"
          aria-live="polite"
        >
          <p className="fw-bold mb-0 fs-6">
            <i className="fas fa-check-circle me-2"></i>
            {message}
          </p>
        </div>
      )}
      {error && (
        <div
          className="alert alert-danger border-0 rounded-3 shadow-sm animate__animated animate__fadeInDown px-4 py-3"
          role="alert"
          aria-live="assertive"
        >
          <p className="fw-bold mb-0 fs-6">
            <i className="fas fa-exclamation-triangle me-2"></i>Error!{" "}
            {error}
          </p>
        </div>
      )}

      {/* Transformed Text Display (if any) */}
      {transformedText && (
        <div className="mb-5 p-4 rounded-4 border border-primary bg-primary bg-opacity-10 animate__animated animate__fadeIn">
          <h3 className="h5 text-primary mb-3 fw-bold">Transformed Text</h3>
          <p className="text-break text-secondary-emphasis">{transformedText}</p>
        </div>
      )}
    </>
  );
};

export default TextEditor;
