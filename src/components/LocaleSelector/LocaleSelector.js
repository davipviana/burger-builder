import React from "react";

import { useTranslation } from "react-i18next";

import styles from "./LocaleSelector.module.css";

const LocaleSelector = () => {
  const { i18n } = useTranslation();

  const onChange = (event) => {
    const languageKey = event.target.value;
    i18n.changeLanguage(languageKey);
  };

  return (
    <select className={styles.LocaleSelector} onChange={onChange}>
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
