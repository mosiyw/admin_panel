/* eslint-disable no-unused-expressions */
import {
  disable as disableDarkMode,
  enable as enableDarkMode,
  exportGeneratedCSS as collectCSS,
  setFetchMethod,
} from "darkreader";
import { useLayoutEffect, useMemo, useState } from "react";

const getLocalStorageDarkModeState = () => {
  const storedValue = localStorage.getItem("isDarkMode");

  return storedValue ? JSON.parse(storedValue) : false;
};

export default function useDarkMode() {
  const [isDark, setIsDark] = useState(getLocalStorageDarkModeState());

  const defaultTheme = {
    brightness: 100,
    contrast: 80,
    sepia: 1,
  };

  useLayoutEffect(() => {
    setFetchMethod(window.fetch);

    isDark ? enableDarkMode({ ...defaultTheme }) : disableDarkMode();

    localStorage.setItem("isDarkMode", JSON.stringify(isDark));
  }, [isDark]);

  const action = useMemo(() => {
    const toggle = () => setIsDark((prevState) => !prevState);

    return { toggle, collectCSS };
  }, [isDark]);

  return [isDark, action];
}
