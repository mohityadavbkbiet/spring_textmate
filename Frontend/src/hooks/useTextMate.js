// src/hooks/useTextMate.js
import { useState, useEffect, useRef, useCallback } from "react";
import { translations } from "../utils/i18n"; // Import translations
import { loginUser, signupUser, performTextOperationApi } from "../utils/api";

const useTextMate = () => {
  // --- Text Processing States ---
  const [text, setText] = useState("");
  const [transformedText, setTransformedText] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [sentenceCount, setSentenceCount] = useState(0);
  const [readTime, setReadTime] = useState(0);

  // --- UI/Global States ---
  const [message, setMessage] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // --- Authentication States ---
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [authUsername, setAuthUsername] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authConfirmPassword, setAuthConfirmPassword] = useState("");
  const [authMessage, setAuthMessage] = useState(""); // Messages specific to auth modals

  // --- Refs ---
  const messageTimeoutRef = useRef(null);
  const errorTimeoutRef = useRef(null);
  const debounceTimeoutRef = useRef(null);

  // --- Memoized Translation Getter ---
  const t = useCallback(
    (key) => {
      const keys = key.split(".");
      let currentTranslation = translations[selectedLanguage];
      for (let i = 0; i < keys.length; i++) {
        if (
          currentTranslation &&
          typeof currentTranslation === "object" &&
          keys[i] in currentTranslation
        ) {
          currentTranslation = currentTranslation[keys[i]];
        } else {
          return key;
        }
      }
      return currentTranslation || key;
    },
    [selectedLanguage]
  );

  // --- Helper Functions ---

  // Update Text Analysis (Client-side)
  const updateAnalysis = useCallback((currentText) => {
    if (currentText.trim() === "") {
      setWordCount(0);
      setCharCount(0);
      setSentenceCount(0);
      setReadTime(0);
      return;
    }
    const words = currentText
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0);
    setWordCount(words.length);
    setCharCount(currentText.replace(/\s/g, "").length);
    const sentences = currentText
      .trim()
      .split(/[.!?]+\s*/)
      .filter((s) => s.length > 0)
      .filter((s) => s.trim().length > 0);
    setSentenceCount(sentences.length);
    setReadTime(Math.ceil(words.length * 0.005));
  }, []);

  // --- Authentication Handlers ---
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setAuthMessage("");
    if (!authUsername || !authPassword) {
      setAuthMessage(
        t("messages.usernameRequired") + " " + t("messages.passwordRequired")
      );
      return;
    }

    setLoading(true);
    try {
      const response = await loginUser(authUsername, authPassword);

      if (response.data.success) {
        localStorage.setItem("token", response.data.token); // Store JWT token
        setIsLoggedIn(true);
        setShowLoginModal(false);
        setMessage(t("messages.loginSuccess"));
        setAuthUsername("");
        setAuthPassword("");
      } else {
        setAuthMessage(`${t("messages.loginFailed")} ${response.data.message}`);
      }
    } catch (err) {
      console.error("Login error:", err);
      setAuthMessage(
        `${t("messages.loginFailed")} ${
          err.response?.data?.message || err.message
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setAuthMessage("");
    if (!authUsername || !authPassword || !authConfirmPassword) {
      setAuthMessage(
        t("messages.usernameRequired") + " " + t("messages.passwordRequired")
      );
      return;
    }
    if (authPassword !== authConfirmPassword) {
      setAuthMessage(t("messages.passwordMismatch"));
      return;
    }

    setLoading(true);
    try {
      const response = await signupUser(authUsername, authPassword);

      if (response.data.success) {
        setAuthMessage(t("messages.signupSuccess"));
        setShowSignupModal(false);
        setShowLoginModal(true);
        setAuthUsername("");
        setAuthPassword("");
        setAuthConfirmPassword("");
      } else {
        setAuthMessage(
          `${t("messages.signupFailed")} ${response.data.message}`
        );
      }
    } catch (err) {
      console.error("Signup error:", err);
      setAuthMessage(
        `${t("messages.signupFailed")} ${
          err.response?.data?.message || err.message
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove JWT token
    setIsLoggedIn(false);
    setMessage(t("messages.logoutSuccess"));
    setText("");
    setTransformedText("");
    updateAnalysis(""); // Clear analysis results
  };

  // --- Effects ---

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark-mode");
      document.body.classList.add("bg-dark", "text-light");
      document.body.classList.remove("bg-light", "text-dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark-mode");
      document.body.classList.add("bg-light", "text-dark");
      document.body.classList.remove("bg-dark", "text-light");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
    } else {
      setIsDarkMode(false);
    }
  }, []);

  useEffect(() => {
    if (message) {
      if (messageTimeoutRef.current) clearTimeout(messageTimeoutRef.current);
      messageTimeoutRef.current = setTimeout(() => setMessage(""), 3000);
    }
    if (error) {
      if (errorTimeoutRef.current) clearTimeout(errorTimeoutRef.current);
      errorTimeoutRef.current = setTimeout(() => setError(""), 5000);
    }
    return () => {
      if (messageTimeoutRef.current) clearTimeout(messageTimeoutRef.current);
      if (errorTimeoutRef.current) clearTimeout(errorTimeoutRef.current);
    };
  }, [message, error]);

  useEffect(() => {
    if (debounceTimeoutRef.current) clearTimeout(debounceTimeoutRef.current);
    debounceTimeoutRef.current = setTimeout(() => {
      updateAnalysis(text);
    }, 500);
    return () => {
      if (debounceTimeoutRef.current) clearTimeout(debounceTimeoutRef.current);
    };
  }, [text, updateAnalysis]);

  // Handle Text Area Changes
  const handleOnChange = (event) => {
    const newText = event.target.value;
    setText(newText);
    setTransformedText(""); // Clear transformed text when original text changes
  };

  // API Call Helper Function for text operations
  const performTextOperation = useCallback(
    async (endpoint, operationType) => {
      if (text.trim().length === 0) {
        setMessage(t("messages.noText"));
        setError("");
        return;
      }

      setLoading(true);
      setError("");
      setMessage("");

      try {
        const response = await performTextOperationApi(endpoint, text);

        if (response.data.success) {
          setTransformedText(response.data.transformedText || "");
          if (operationType === "analyze") {
            const { analysis } = response.data;
            setWordCount(analysis.wordCount);
            setCharCount(analysis.charCount);
            setSentenceCount(analysis.sentenceCount);
            setReadTime(analysis.readTime);
          }
        } else {
          setError(
            `${t("messages.errorFetching")} ${
              response.data.message || "Unknown error."
            }`
          );
          setTransformedText("");
        }
      } catch (err) {
        console.error(`Error during ${operationType} operation:`, err);
        setError(
          `${t("messages.errorFetching")} ${
            err.response?.data?.message || err.message
          }`
        );
        if (err.response && err.response.status === 401 && isLoggedIn) {
          setMessage(t("messages.sessionExpired"));
          handleLogout();
          setShowLoginModal(true);
        }
      } finally {
        setLoading(false);
      }
    },
    [text, t, isLoggedIn, handleLogout]
  );

  const handleUpperCase = () => performTextOperation("uppercase", "uppercase");
  const handleLowerCase = () => performTextOperation("lowercase", "lowercase");
  const handleTitleCase = () => performTextOperation("titlecase", "titlecase");
  const handleReverseText = () => performTextOperation("reverse", "reverse");

  const handleClearText = () => setShowConfirmModal(true);
  const confirmClear = () => {
    setText("");
    setTransformedText("");
    updateAnalysis("");
    setMessage("");
    setError("");
    setShowConfirmModal(false);
  };
  const cancelClear = () => setShowConfirmModal(false);

  const handleCopyText = (textAreaRef) => {
    if (text.length === 0 && transformedText.length === 0) {
      setMessage(t("messages.noText"));
      return;
    }
    const textToCopy = transformedText || text;
    if (textAreaRef.current) {
      const originalValue = textAreaRef.current.value;
      textAreaRef.current.value = textToCopy;
      textAreaRef.current.select();
      try {
        const successful = document.execCommand("copy");
        setMessage(
          successful ? t("messages.copied") : t("messages.copyFailed")
        );
      } catch (err) {
        console.error("Failed to copy text using execCommand:", err);
        setMessage(t("messages.copyFailed"));
      } finally {
        textAreaRef.current.value = originalValue;
        textAreaRef.current.blur();
      }
    }
  };

  const toggleDarkMode = () => setIsDarkMode((prevMode) => !prevMode);
  const handleLanguageChange = (event) =>
    setSelectedLanguage(event.target.value);

  return {
    text,
    setText,
    transformedText,
    setTransformedText,
    wordCount,
    charCount,
    sentenceCount,
    readTime,
    message,
    setMessage,
    isDarkMode,
    setIsDarkMode,
    selectedLanguage,
    setSelectedLanguage,
    loading,
    setLoading,
    error,
    setError,
    showConfirmModal,
    setShowConfirmModal,
    isLoggedIn,
    setIsLoggedIn,
    showLoginModal,
    setShowLoginModal,
    showSignupModal,
    setShowSignupModal,
    authUsername,
    setAuthUsername,
    authPassword,
    setAuthPassword,
    authConfirmPassword,
    setAuthConfirmPassword,
    authMessage,
    setAuthMessage,
    t,
    updateAnalysis,
    handleLoginSubmit,
    handleSignupSubmit,
    handleLogout,
    handleOnChange,
    performTextOperation,
    handleUpperCase,
    handleLowerCase,
    handleTitleCase,
    handleReverseText,
    handleClearText,
    confirmClear,
    cancelClear,
    handleCopyText,
    toggleDarkMode,
    handleLanguageChange,
  };
};

export default useTextMate;
