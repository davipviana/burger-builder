const storageKeys = {
  selectedLanguage: "burgerBuilder.selectedLanguage",
};

const getItem = (key) => localStorage.getItem(key);
const setItem = (key, value) => localStorage.setItem(key, value);

export default {
  getSelectedLanguage: () => getItem(storageKeys.languageIsoCode),
  setSelectedLanguage: (value) => setItem(storageKeys.languageIsoCode, value),
};
