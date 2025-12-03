import { shoppingData } from "./shopping-data.js";

document.addEventListener("DOMContentLoaded", () => {
  renderProducts("All");
  setupTabs();
});

function setupTabs() {
  const tabs = document.querySelectorAll(".shop-tab");
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".shop-tab").forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      renderProducts(tab.dataset.category);
    });
  });
}

function renderProducts(category) {
  const container = document.querySelector(".shop-list");
  if (!container) return;

  container.innerHTML = "";

  const filtered = category === "All"
    ? shoppingData
    : shoppingData.filter(item => item.category === category);

  filtered.forEach(item => {
    const card = document.createElement("div");
    card.className = "shop-card";
    card.innerHTML = `
      <div class="shop-image-container">
        <img src="${item.image}" alt="${item.title}" class="shop-image" loading="lazy">
        <div class="shop-badge">${item.category}</div>
      </div>
      <div class="shop-content">
        <div class="shop-header">
          <h3 class="shop-title">${item.title}</h3>
          <span class="shop-price">${formatPrice(item.price)}</span>
        </div>
        <p class="shop-desc">${item.desc}</p>
        <a href="${item.url}" target="_blank" class="btn btn-sm btn-outline" style="width: 100%; margin-top: 10px; text-align: center; display: block; text-decoration: none;">
          <i class="fa-brands fa-amazon"></i> View on Amazon
        </a>
      </div>
    `;
    container.appendChild(card);
    container.appendChild(card);
  });
}

// Listen for language changes
window.addEventListener("languageChanged", (e) => {
  const activeTab = document.querySelector(".shop-tab.active");
  const category = activeTab ? activeTab.dataset.category : "All";
  renderProducts(category);
});

function formatPrice(priceStr) {
  // Extract number from "¥16,800"
  const jpy = parseInt(priceStr.replace(/[^0-9]/g, ""));
  const lang = localStorage.getItem("tova_lang") || "en";

  if (lang === "en") {
    // Approx 1 USD = 150 JPY
    const usd = (jpy / 150).toFixed(2);
    return `$${usd}`;
  } else if (lang === "ko") {
    // Approx 100 JPY = 900 KRW
    const krw = Math.floor(jpy * 9).toLocaleString();
    return `₩${krw}`;
  } else if (lang === "zh") {
    // Approx 1 CNY = 21 JPY
    const cny = Math.floor(jpy / 21).toLocaleString();
    return `¥${cny}`;
  }

  // Default JPY (ja)
  return priceStr;
}

// Removed addToCart function as it's no longer used
