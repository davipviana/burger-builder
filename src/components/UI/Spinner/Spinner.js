import React from "react";

import styles from "./Spinner.module.css";
import { useTranslation } from "react-i18next";

const Spinner = () => {
  const { t } = useTranslation();
  return <div className={styles.Loader}>{t("loading")}...</div>;
};

export default Spinner;
