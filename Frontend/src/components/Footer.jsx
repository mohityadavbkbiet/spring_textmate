// src/components/Footer.jsx
import React from "react";

const Footer = ({ t }) => {
  return (
    <footer className="mt-5 text-center text-muted small py-4 border-top border-secondary-subtle">
      <p className="mb-1">{t("footer.madeWithLove")}</p>
      <p>
        &copy; {new Date().getFullYear()} TextMate.{" "}
        {t("footer.rightsReserved")}
      </p>
      <p className="mt-2 text-xs">
        GitHub Repository:{" "}
        <a
          href="https://github.com/mohityadavbkbiet/TextMate"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary text-decoration-none fw-semibold"
        >
          mohityadavbkbiet/TextMate
        </a>
      </p>
    </footer>
  );
};

export default Footer;
