import React from "react";

import { useTranslation } from "react-i18next";

import storage from "../../shared/storage";

import styles from "./LocaleSelector.module.css";

const LocaleSelector = () => {
  const { i18n } = useTranslation();

  const onChange = (event) => {
    const languageKey = event.target.value;
    i18n.changeLanguage(languageKey);
  };

  const selectedLanguage = storage.getSelectedLanguage();

  return (
    <select
      className={styles.LocaleSelector}
      value={selectedLanguage}
      onChange={onChange}
    >
      <option key={"pt-BR"} value={"pt-BR"}>
        PT
      </option>
      <option key={"en-US"} value={"en-US"}>
        EN
      </option>
    </select>
  );
};

export default LocaleSelector;
