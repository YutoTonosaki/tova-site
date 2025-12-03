// Theme Toggler
document.addEventListener("DOMContentLoaded", () => {
  const themeToggleBtn = document.getElementById("theme-toggle");
  const icon = themeToggleBtn ? themeToggleBtn.querySelector("i") : null;

  // Check local storage
  const currentTheme = localStorage.getItem("theme");
  if (currentTheme === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
    if (icon) icon.className = "fa-solid fa-sun";
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      const isDark = document.documentElement.getAttribute("data-theme") === "dark";

      if (isDark) {
        document.documentElement.setAttribute("data-theme", "light");
        localStorage.setItem("theme", "light");
        if (icon) icon.className = "fa-solid fa-moon";
      } else {
        document.documentElement.setAttribute("data-theme", "dark");
        localStorage.setItem("theme", "dark");
        if (icon) icon.className = "fa-solid fa-sun";
      }
    });
  }
});
