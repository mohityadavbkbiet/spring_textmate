// src/components/TextAnalysis.jsx
import React from "react";

const TextAnalysis = ({ t, wordCount, charCount, sentenceCount, readTime, isDarkMode }) => {
  return (
    <div className="mb-5">
      <h2 className="h4 text-primary mb-4 fw-bold">
        {t("analysis.summary")}
      </h2>
      <div className="row g-4">
        <div className="col-12 col-sm-6 col-lg-3 analysis-card-col">
          <div className={`card card-custom h-100 \${isDarkMode ? "dark-mode" : ""}`}>
            <div className="card-body text-center">
              <h3 className="card-title h6 text-muted mb-2">
                {t("analysis.words")}
              </h3>
              <p className="card-text display-5 fw-bold text-primary">
                {wordCount}
              </p>
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-lg-3 analysis-card-col">
          <div className={`card card-custom h-100 \${isDarkMode ? "dark-mode" : ""}`}>
            <div className="card-body text-center">
              <h3 className="card-title h6 text-muted mb-2">
                {t("analysis.characters")}
              </h3>
              <p className="card-text display-5 fw-bold text-primary">
                {charCount}
              </p>
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-lg-3 analysis-card-col">
          <div className={`card card-custom h-100 \${isDarkMode ? "dark-mode" : ""}`}>
            <div className="card-body text-center">
              <h3 className="card-title h6 text-muted mb-2">
                {t("analysis.sentences")}
              </h3>
              <p className="card-text display-5 fw-bold text-primary">
                {sentenceCount}
              </p>
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-lg-3 analysis-card-col">
          <div className={`card card-custom h-100 \${isDarkMode ? "dark-mode" : ""}`}>
            <div className="card-body text-center">
              <h3 className="card-title h6 text-muted mb-2">
                {t("analysis.readTime")}
              </h3>
              <p className="card-text display-5 fw-bold text-primary">
                {readTime}{" "}
                <small className="text-muted h6">{t("analysis.minutes")}</small>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextAnalysis;
