import { useState } from "react";
import NumbersButtons from "./NumbersButtons";
import Display from "./Display";
import Theme from "./Theme";
import * as math from "mathjs";
import styles from "./Calculator.module.css";

function Calculator() {
  // Display values useState
  const [firstNumber, setFirstNumber] = useState("0");
  const [symbol, setSymbol] = useState("");
  const [secondNumber, setSecondNumber] = useState("");
  const [isEvaluate, setIsEvaluated] = useState(false);
  const [theme, setTheme] = useState("theme1");

  function toggleTheme(nextTheme) {
    setTheme(nextTheme);
  }

  // Function when we click the number

  function clickNumber(value) {
    if (firstNumber.includes(".") && symbol !== "") {
      // If the symbol is set and the first number contains a decimal point, treat the input as part of the second number
      if (secondNumber.length < 14) {
        setSecondNumber((prevValue) => prevValue + value);
      }
    } else {
      // If the symbol is not set or the first number doesn't contain a decimal point, treat the input as part of the first number
      if (symbol === "") {
        if (firstNumber.length < 14) {
          setFirstNumber((prevValue) =>
            prevValue === "0" ? value : prevValue + value
          );
        }
      } else {
        if (secondNumber.length < 14) {
          setSecondNumber((prevValue) =>
            prevValue === "0" ? value : prevValue + value
          );
        }
      }
    }
  }

  // Function when we click

  function clickDot() {
    if (symbol === "") {
      if (!firstNumber.includes(".") && firstNumber !== "") {
        setFirstNumber((prevValue) => prevValue + ".");
      } else if (firstNumber === "0") {
        setFirstNumber("0.");
      }
    } else {
      if (!secondNumber.includes(".") && secondNumber !== "") {
        setSecondNumber((prevValue) => prevValue + ".");
      } else if (secondNumber === "") {
        setSecondNumber("0.");
      }
    }
  }

  // Functuoin when we click symbol

  function clickSymbol(value) {
    if (firstNumber !== "" && secondNumber !== "") {
      evalResult();
    }
    setSymbol(value);
  }

  // Function when we do calculation equalto

  function roundToCalculatorPrecision(num) {
    const precision = 15;
    return parseFloat(num.toPrecision(precision));
  }
  function evalResult() {
    setIsEvaluated(true);
    // Remove commas from firstNumber and secondNumber
    const firstNumWithoutCommas = firstNumber.replace(/,/g, "");
    const secondNumWithoutCommas = secondNumber.replace(/,/g, "");
    const expression = `${firstNumWithoutCommas}${symbol}${secondNumWithoutCommas}`;
    try {
      const result = math.evaluate(expression);
      const roundedResult = roundToCalculatorPrecision(result);
      let formattedResult;
      if (result.toString().length > 10) {
        formattedResult = roundedResult.toExponential();
      } else {
        formattedResult = roundedResult.toLocaleString("en-US");
      }
      setFirstNumber(formattedResult);
      setSymbol("");
      setSecondNumber("");
    } catch (error) {
      console.error("Error evaluating expression:", error.message);
    }
  }

  // Functin when Del option is selected

  function clickDelOption() {
    if (secondNumber !== "") {
      setSecondNumber((prevValue) => prevValue.slice(0, -1));
    } else if (symbol !== "") {
      setSymbol("");
    } else if (firstNumber !== "" && firstNumber.length === 1) {
      setFirstNumber("0");
    } else {
      const currentDisplay = parseFloat(firstNumber);
      if (
        !Number.isFinite(currentDisplay) ||
        isNaN(currentDisplay) ||
        isEvaluate
      ) {
        setFirstNumber("0");
        setIsEvaluated(false);
      } else {
        setFirstNumber((prevValue) => prevValue.slice(0, -1));
      }
    }
  }

  // Function when Reset is selected

  function resetDisplay() {
    setFirstNumber("0");
    setSymbol("");
    setSecondNumber("");
    setIsEvaluated(false);
  }

  return (
    <div
      // className={styles.container}
      className={`${styles.container} ${styles[theme]}`}
    >
      <Theme initialTheme={theme} toggleTheme={toggleTheme} />

      <Display
        firstNumber={firstNumber}
        symbol={symbol}
        secondNumber={secondNumber}
      />
      <NumbersButtons
        clickNumber={clickNumber}
        clickSymbol={clickSymbol}
        clickDot={clickDot}
        clickDelOption={clickDelOption}
        resetDisplay={resetDisplay}
        evalResult={evalResult}
        theme={theme}
      />
    </div>
  );
}
export default Calculator;
