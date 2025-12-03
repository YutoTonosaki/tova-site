import { translations } from "./translations.js";

let currentLang = "en"; // Default

export function initLanguage() {
  // 1. Check localStorage
  const savedLang = localStorage.getItem("tova_lang");
  if (savedLang) {
    setLanguage(savedLang);
    return;
  }

  // 2. Default to English (Ignore Browser/System)
  setLanguage("en");
}

// Called by location-manager if location is determined
export function setLanguageFromLocation(timezone) {
  // Only override if user hasn't explicitly set a preference (optional logic)
  // For this request, we'll prioritize location if no local storage is set.
  if (!localStorage.getItem("tova_lang")) {
    if (timezone === "Asia/Tokyo") {
      setLanguage("ja");
    } else if (timezone === "Asia/Seoul") {
      setLanguage("ko");
    } else if (timezone.startsWith("Asia/Shanghai") || timezone.startsWith("Asia/Chongqing") || timezone.startsWith("Asia/Hong_Kong") || timezone.startsWith("Asia/Taipei")) {
      setLanguage("zh");
    } else {
      setLanguage("en");
    }
  }
}

export function setLanguage(lang) {
  if (!translations[lang]) return;
  currentLang = lang;
  localStorage.setItem("tova_lang", lang);

  // Update Selector if exists
  const selector = document.getElementById("lang-selector");
  if (selector) selector.value = lang;

  // Update DOM elements
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    const text = translations[lang][key];

    if (text) {
      // Handle HTML content (for hero title) vs Text content
      if (el.tagName === "INPUT" && el.getAttribute("placeholder")) {
        el.placeholder = text;
      } else {
        el.innerHTML = text;
      }
    }
  });

  // Update Dynamic Components (News Title)
  // We might need to re-render news or update its title separately
  // For now, let's just update the title if it exists and has a key
  // (News content itself is mock data and hard to translate fully without more data)

  // Dispatch Event for other components
  window.dispatchEvent(new CustomEvent("languageChanged", { detail: { language: lang } }));
}

export function getCurrentLang() {
  return currentLang;
}

// Expose to global for manual selector
window.changeLanguage = (lang) => {
  setLanguage(lang);
};

document.addEventListener("DOMContentLoaded", initLanguage);
