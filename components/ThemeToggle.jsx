"use client"
import { useState } from "react";
import { LuMoon, LuSun } from "react-icons/lu";

const themes = {
  autumn: "autumn",
  coffee: "coffee",
}

const ThemeToggle = () => {
  const [theme, setTheme] = useState(themes.autumn);

  const toggleTheme = () => {
    const newTheme = theme === themes.autumn ? themes.coffee : themes.autumn;

    try {
      document?.documentElement?.setAttribute("data-theme", newTheme);
    } catch (error) {
      console.log(error);
    }

    setTheme(newTheme);
  }

  return (
    <button className="btn btn-ghost btn-circle" onClick={toggleTheme}>
      {theme === themes.autumn
        ? <LuMoon className="size-6" />
        : <LuSun className="size-6" />
      }
    </button>
  )
}

export default ThemeToggle