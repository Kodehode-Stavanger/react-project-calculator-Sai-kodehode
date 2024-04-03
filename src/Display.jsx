import React from "react";

function Display({ firstNumber, symbol, secondNumber }) {
  // Function to add commas to numbers
  function addCommas(numString) {
    // Split the number into integer and fractional parts
    const parts = numString.toString().split(".");
    // Add commas to the integer part
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    // Join the parts back together
    return parts.join(".");
  }

  // Format numbers with commas
  const formattedFirstNumber = addCommas(firstNumber);
  const formattedSecondNumber = addCommas(secondNumber);
  console.log(formattedFirstNumber, formattedSecondNumber);

  // Calculate the total length of the displayed content
  const totalLength =
    formattedFirstNumber.length + symbol.length + formattedSecondNumber.length;

  // change the font size based on the total length
  let fontSize = "2.6rem";
  if (totalLength > 14) {
    fontSize = `${1.8 - (totalLength - 14) * 0.1}rem`;
    if (parseFloat(fontSize) < 1) {
      fontSize = "1rem";
    }
  }

  // Style object to apply dynamic font size
  const style = {
    fontSize: fontSize,
  };

  return (
    <div className="display" style={style}>
      <p>{formattedFirstNumber}</p>
      <p>{symbol}</p>
      <p>{formattedSecondNumber}</p>
    </div>
  );
}

export default Display;
