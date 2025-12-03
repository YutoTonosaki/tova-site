
// Open-Meteo API URL
const WEATHER_API_URL = "https://api.open-meteo.com/v1/forecast";

// DOM Elements
const clockEl = document.getElementById("clock-widget");
const dateEl = document.getElementById("date-widget");
const locationEl = document.getElementById("location-display"); // New ID needed in HTML
const weatherIconEl = document.querySelector(".weather-icon");
const tempEl = document.querySelector(".weather-info .temp");
const conditionEl = document.querySelector(".weather-info div:last-child");

// Weather Code Map (Simplified)
// Weather Code Map (Simplified)
const weatherCodeMap = {
  0: { icon: "fa-sun", text: "Clear", bgClass: "weather-bg-sunny" },
  1: { icon: "fa-cloud-sun", text: "Mainly Clear", bgClass: "weather-bg-sunny" },
  2: { icon: "fa-cloud-sun", text: "Partly Cloudy", bgClass: "weather-bg-cloudy" },
  3: { icon: "fa-cloud", text: "Overcast", bgClass: "weather-bg-cloudy" },
  45: { icon: "fa-smog", text: "Fog", bgClass: "weather-bg-cloudy" },
  48: { icon: "fa-smog", text: "Depositing Rime Fog", bgClass: "weather-bg-cloudy" },
  51: { icon: "fa-cloud-rain", text: "Light Drizzle", bgClass: "weather-bg-rain" },
  53: { icon: "fa-cloud-rain", text: "Moderate Drizzle", bgClass: "weather-bg-rain" },
  55: { icon: "fa-cloud-showers-heavy", text: "Dense Drizzle", bgClass: "weather-bg-rain" },
  61: { icon: "fa-cloud-rain", text: "Slight Rain", bgClass: "weather-bg-rain" },
  63: { icon: "fa-cloud-rain", text: "Moderate Rain", bgClass: "weather-bg-rain" },
  65: { icon: "fa-cloud-showers-heavy", text: "Heavy Rain", bgClass: "weather-bg-rain" },
  71: { icon: "fa-snowflake", text: "Slight Snow", bgClass: "weather-bg-snow" },
  73: { icon: "fa-snowflake", text: "Moderate Snow", bgClass: "weather-bg-snow" },
  75: { icon: "fa-snowflake", text: "Heavy Snow", bgClass: "weather-bg-snow" },
  95: { icon: "fa-bolt", text: "Thunderstorm", bgClass: "weather-bg-rain" },
};

// State
let currentLocation = {
  latitude: 35.6895, // Default: Tokyo
  longitude: 139.6917,
  timezone: "Asia/Tokyo",
  city: "Tokyo (Default)"
};

import { setLanguageFromLocation } from "./language-manager.js";

// 1. Get Location
export function initLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        currentLocation.latitude = position.coords.latitude;
        currentLocation.longitude = position.coords.longitude;
        // Approximation of timezone based on browser
        currentLocation.timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        currentLocation.city = currentLocation.timezone.split("/")[1].replace("_", " ");

        updateLocationDisplay();
        fetchWeather();
        startClock();

        // Notify News Renderer (if available)
        if (window.updateNewsRegion) {
          window.updateNewsRegion(currentLocation.timezone);
        }

        // Update Language based on location
        setLanguageFromLocation(currentLocation.timezone);
      },
      (error) => {
        console.warn("Geolocation denied or failed. Using default.", error);
        updateLocationDisplay();
        fetchWeather();
        startClock();
      }
    );
  } else {
    console.warn("Geolocation not supported.");
    startClock();
  }
}

function updateLocationDisplay() {
  const locDisplay = document.querySelector(".widget-header span[style*='font-size: 12px']");
  if (locDisplay) {
    locDisplay.textContent = currentLocation.city;
  }
}

// 2. Fetch Weather
async function fetchWeather() {
  try {
    const url = `${WEATHER_API_URL}?latitude=${currentLocation.latitude}&longitude=${currentLocation.longitude}&current_weather=true&timezone=${currentLocation.timezone}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.current_weather) {
      const { temperature, weathercode } = data.current_weather;
      // Map weather code to our simplified map
      // Note: weatherCodeMap needs to be updated to include 'bgClass'
      const weatherInfo = weatherCodeMap[weathercode] || { icon: "fa-cloud", text: "Unknown", bgClass: "weather-bg-cloudy" };

      // Update DOM
      const bgEl = document.getElementById("weather-dynamic-bg");
      const iconEl = document.querySelector(".weather-icon-dynamic");
      const tempEl = document.querySelector(".temp-dynamic");
      const condEl = document.querySelector(".condition-dynamic");

      if (tempEl) tempEl.textContent = `${temperature}°C`;
      if (condEl) condEl.textContent = weatherInfo.text;
      if (iconEl) {
        iconEl.className = `fa-solid ${weatherInfo.icon} weather-icon-dynamic`;
      }

      // Apply Background Class
      if (bgEl) {
        // Remove existing weather bg classes
        bgEl.classList.remove("weather-bg-sunny", "weather-bg-cloudy", "weather-bg-rain", "weather-bg-snow");
        // Add new class
        if (weatherInfo.bgClass) {
          bgEl.classList.add(weatherInfo.bgClass);
        } else {
          // Default based on simple logic if bgClass missing in map
          bgEl.classList.add("weather-bg-cloudy");
        }
      }
    }
  } catch (error) {
    console.error("Failed to fetch weather:", error);
  }
}

// 3. Clock
function startClock() {
  function update() {
    const now = new Date();
    // Use the detected timezone if possible, otherwise browser default
    const timeString = now.toLocaleTimeString('en-US', {
      timeZone: currentLocation.timezone,
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
    const dateString = now.toLocaleDateString('en-US', {
      timeZone: currentLocation.timezone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });

    if (clockEl) clockEl.textContent = timeString;
    if (dateEl) dateEl.textContent = dateString;

    updateCelestialPositions(now);
  }

  update(); // Initial call
  setInterval(update, 1000);
}

// 4. Celestial Animation Logic
function updateCelestialPositions(now) {
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const totalMinutes = hours * 60 + minutes;

  // Day: 6:00 (360m) to 18:00 (1080m) -> Sun visible
  // Night: 18:00 (1080m) to 6:00 (360m next day) -> Moon visible

  const sky = document.querySelector('.sky');
  const sun = document.querySelector('.sun');
  const moon = document.querySelector('.moon');

  if (!sky || !sun || !moon) return;

  // Sky Color Logic
  if (hours >= 5 && hours < 7) {
    sky.className = 'sky sunrise';
  } else if (hours >= 7 && hours < 17) {
    sky.className = 'sky'; // Day
  } else if (hours >= 17 && hours < 19) {
    sky.className = 'sky sunset';
  } else {
    sky.className = 'sky night';
  }

  // Sun Position (0% to 100% across the arc)
  // Visible from 6:00 to 18:00
  if (totalMinutes >= 360 && totalMinutes <= 1080) {
    const dayProgress = (totalMinutes - 360) / 720; // 0.0 to 1.0
    const sunX = dayProgress * 100; // 0% to 100%
    const sunY = Math.sin(dayProgress * Math.PI) * 80; // Arc height (px)

    sun.style.left = `calc(${sunX}% - 25px)`;
    sun.style.bottom = `${sunY + 20}px`; // Base offset
    sun.style.opacity = 1;

    moon.style.opacity = 0; // Hide moon
  } else {
    // Night Logic for Moon
    // 18:00 (1080) -> 0.0, 6:00 (360) -> 1.0
    let nightProgress = 0;
    if (totalMinutes > 1080) {
      nightProgress = (totalMinutes - 1080) / 720;
    } else {
      nightProgress = (totalMinutes + (24 * 60 - 1080)) / 720;
    }

    const moonX = nightProgress * 100;
    const moonY = Math.sin(nightProgress * Math.PI) * 80;

    moon.style.left = `calc(${moonX}% - 25px)`;
    moon.style.bottom = `${moonY + 20}px`;
    moon.style.opacity = 1;

    sun.style.opacity = 0; // Hide sun

    // Update Moon Phase Icon
    updateMoonPhase(now, moon);
  }
}

function updateMoonPhase(date, moonEl) {
  // Simple Moon Phase Calculation (Conway's algorithm)
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  let r = year % 100;
  r %= 19;
  if (r > 9) { r -= 19; }
  r = ((r * 11) % 30) + parseInt(month) + parseInt(day);
  if (month < 3) { r += 2; }
  r -= ((year < 2000) ? 4 : 8.3);
  r = Math.floor(r + 0.5) % 30;
  const age = (r < 0) ? r + 30 : r;

  // age: 0-29 (0=New, 15=Full)
  const icon = moonEl.querySelector('i');
  if (!icon) return;

  // Remove existing classes
  icon.className = '';

  // Set icon based on phase
  // Using FontAwesome classes (approximation)
  // 0-1: New Moon
  // 2-6: Waxing Crescent
  // 7-8: First Quarter
  // 9-13: Waxing Gibbous
  // 14-16: Full Moon
  // 17-21: Waning Gibbous
  // 22-23: Last Quarter
  // 24-28: Waning Crescent
  // 29: New Moon

  /* 
     Note: FontAwesome Free might not have all moon phases.
     We will use basic shapes or rotations if needed.
     For now, we use available icons.
  */

  if (age >= 0 && age <= 1) {
    icon.className = 'fa-regular fa-circle'; // New Moon (Empty)
  } else if (age >= 14 && age <= 16) {
    icon.className = 'fa-solid fa-circle'; // Full Moon
  } else {
    icon.className = 'fa-solid fa-moon'; // Crescent/Gibbous (Generic)
  }
}

// Initialize on load
document.addEventListener("DOMContentLoaded", initLocation);
