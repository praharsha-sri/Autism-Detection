let currentLanguage = "en";
let translations = {};

async function loadTranslations() {
  try {
    const response = await fetch("translations.json");
    translations = await response.json();
  } catch (error) {
    console.error("Error loading translations:", error);
  }
}

function setLanguage(lang) {
  currentLanguage = lang;
  localStorage.setItem("selectedLanguage", lang);
  translatePage();
  // Dispatch a custom event to notify other parts of the application
  window.dispatchEvent(
    new CustomEvent("languageChanged", { detail: { language: lang } })
  );
}

function translatePage() {
  document.querySelectorAll("[data-translate]").forEach((element) => {
    const key = element.getAttribute("data-translate");
    element.textContent = translate(key);
  });

  document
    .querySelectorAll("[data-translate-placeholder]")
    .forEach((element) => {
      const key = element.getAttribute("data-translate-placeholder");
      element.placeholder = translate(key);
    });
}

function translate(key) {
  const keys = key.split(".");
  let value = translations[currentLanguage];
  for (const k of keys) {
    value = value[k];
    if (!value) break;
  }
  return value || key;
}

// Initialize translations
document.addEventListener("DOMContentLoaded", async () => {
  await loadTranslations();
  const savedLanguage = localStorage.getItem("selectedLanguage") || "en";
  setLanguage(savedLanguage);
});
