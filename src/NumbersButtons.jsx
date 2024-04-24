import React from "react";
import styles from "./NumbersButtons.module.css";

const NumbersButtons = ({
  clickNumber,
  clickSymbol,
  clickDot,
  clickDelOption,
  resetDisplay,
  evalResult,
  theme,
}) => {
  const buttonLayout = [
    "7",
    "8",
    "9",
    "DEL",
    "4",
    "5",
    "6",
    "+",
    "1",
    "2",
    "3",
    "-",
    ".",
    "0",
    "/",
    "*",
    "RESET",
    "=",
  ];

  return (
    <div className={`${styles.container2} ${styles[theme]}`}>
      {buttonLayout.map((button) => (
        <button
          key={button}
          onClick={() => {
            if (button === "DEL") clickDelOption();
            else if (button === "RESET") resetDisplay();
            else if (button === "=") evalResult();
            else if (button === ".") clickDot();
            else if (["+", "-", "/", "*"].includes(button)) clickSymbol(button);
            else clickNumber(button);
          }}
          className={`${styles.button} ${
            button === "DEL"
              ? styles.delete
              : button === "RESET"
              ? styles.reset
              : button === "="
              ? styles.equalto
              : ""
          }`}
        >
          {button}
        </button>
      ))}
    </div>
  );
};

export default NumbersButtons;
