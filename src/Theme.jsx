import React, { useState, useEffect } from "react";

function Theme({ initialTheme, toggleTheme }) {
  const [theme, setTheme] = useState(initialTheme);

  useEffect(() => {
    // Update theme when it changes
    const themeToggleElement = document.querySelector(".themeToggle");
    themeToggleElement.classList.remove("theme1", "theme2", "theme3");
    themeToggleElement.classList.add(theme);
  }, [theme]);

  function handleToggle() {
    const nextTheme = {
      theme1: "theme2",
      theme2: "theme3",
      theme3: "theme1",
    };
    const nextThemeValue = nextTheme[theme];
    setTheme(nextThemeValue);
    toggleTheme(nextThemeValue);
  }

  return (
    <div className="header">
      <p>calc</p>

      <div className="theme">
        <p>THEME</p>
        <div className="toggledetails">
          <div>
            <div className="themeCount">
              <p>1</p>
              <p className="two">2</p>
              <p>3</p>
            </div>
          </div>

          <button className={`themeToggle ${theme}`}>
            <div onClick={handleToggle} className="circle"></div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Theme;
