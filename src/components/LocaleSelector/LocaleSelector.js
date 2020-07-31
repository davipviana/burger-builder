import React from "react";

import styles from "./LocaleSelector.module.css";

const LocaleSelector = (props) => {
  const onChange = () => {};

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
