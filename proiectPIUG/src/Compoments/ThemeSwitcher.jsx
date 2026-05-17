import React from "react";
import "../Styles/ThemeSwitcher.css";

function ThemeSwitcher({ setTheme }) {
  const themes = [
    { name: "day", color: "#ff4d4d" },
    { name: "night", color: "#4834d4" },
    { name: "green", color: "#7bed9f" },
    { name: "blue", color: "#70a1ff" },
    { name: "pink", color: "#ffafbd" },
  ];


  const handleThemeChange = (themeName) => {
    setTheme(themeName);
    localStorage.setItem("pixello_theme", themeName);
  };

  return (
    <div className="theme-container">
      <div className="theme-trigger">
        <span>🎨</span>
        <div className="theme-options">
          {themes.map((t) => (
            <div
              key={t.name}
              className="theme-circle"
              style={{ backgroundColor: t.color }}
              onClick={() => handleThemeChange(t.name)} 
              title={t.name}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ThemeSwitcher;