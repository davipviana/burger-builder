import React from "react";
import { useTranslation } from "react-i18next";

import styles from "./Input.module.css";

const Input = (props) => {
  const { t } = useTranslation();
  let inputElement = null;
  let validationError = null;
  const inputStyles = [styles.InputElement];
  if (props.invalid && props.shouldValidate && props.touched) {
    inputStyles.push(styles.Invalid);
    validationError = <p>{t("messages.validInputValue")}</p>;
  }

  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          className={inputStyles.join(" ")}
          {...props.elementConfig}
          placeholder={t(props.elementConfig.placeholder)}
          value={props.value}
          onChange={props.onChange}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          className={inputStyles.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.onChange}
        />
      );
      break;
    case "select":
      inputElement = (
        <select
          className={inputStyles.join(" ")}
          value={props.value}
          onChange={props.onChange}
        >
          {props.elementConfig.options.map((option) => (
            <option key={option.value} value={option.value}>
              {t(option.displayValue)}
            </option>
          ))}
        </select>
      );
      break;
    default:
      throw new Error("Unsupported input element type");
  }

  return (
    <div className={styles.Input}>
      <label className={styles.Label}>{props.label}</label>
      {inputElement}
      {validationError}
    </div>
  );
};

export default Input;
