const storageKeys = {
  selectedLanguage: "selectedLanguage",
};

const getItem = (key) => localStorage.getItem(key);
const setItem = (key, value) => localStorage.setItem(key, value);

export default {
  getSelectedLanguage: () => getItem(storageKeys.selectedLanguage),
  setSelectedLanguage: (value) => setItem(storageKeys.selectedLanguage, value),
};
