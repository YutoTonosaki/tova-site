import { newsData } from "./news-data.js";

// Expose to global scope for location-manager.js
window.updateNewsRegion = (timezone) => {
  renderNews(timezone);
};

// Render on load (default)
document.addEventListener("DOMContentLoaded", () => {
  renderNews();
  setupTabs();
});

function setupTabs() {
  const tabs = document.querySelectorAll(".news-tab");
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      // Remove active class from all
      tabs.forEach(t => t.classList.remove("active"));
      // Add active class to clicked
      tab.classList.add("active");

      // Render with selected category
      const category = tab.dataset.category;
      // We need to persist the current region if possible, but for now let's default to Global or grab from title
      // A better way is to store currentRegion in a variable
      renderNews(currentRegion, category);
    });
  });
}

let currentRegion = "Global"; // Store current region state

function renderNews(region = "Global", category = "All") {
  currentRegion = region; // Update state

  const newsContainer = document.querySelector(".news-list");
  if (!newsContainer) return;

  // Simple mapping for demo
  let displayRegion = "Global";
  if (region.includes("Tokyo") || region.includes("Japan")) displayRegion = "Japan";
  if (region.includes("New_York") || region.includes("America")) displayRegion = "US";

  const newsTitle = document.querySelector(".news h2");
  if (newsTitle) {
    newsTitle.textContent = `TOVA News (${displayRegion})`;
  }

  newsContainer.innerHTML = ""; // Clear existing static content

  // Filter news based on region AND category
  const filteredNews = newsData.filter(item => {
    // Region Filter
    const regionMatch = (item.region === "Global" || item.region === displayRegion);

    // Category Filter
    const categoryMatch = (category === "All" || item.category === category);

    return regionMatch && categoryMatch;
  });

  if (filteredNews.length === 0) {
    newsContainer.innerHTML = `<div style="text-align:center; padding:20px; color:#999;">No news in this category.</div>`;
    return;
  }

  // Limit items if category is "All" AND we are NOT on the news page
  const isNewsPage = window.location.pathname.includes("news.html");
  const displayItems = (category === "All" && !isNewsPage) ? filteredNews.slice(0, 4) : filteredNews;

  displayItems.forEach(item => {
    const card = document.createElement("div");
    card.className = "news-card";

    // Category badge color
    let badgeColor = "#666";
    let textColor = "white";

    if (item.category === "Logistics") {
      badgeColor = "var(--navy)";
      textColor = "white";
    }
    if (item.category === "EC") {
      badgeColor = "var(--yellow-accent)";
      textColor = "var(--navy)"; // Dark text on yellow
    }
    if (item.category === "Tech") {
      badgeColor = "#e67e22"; // Orange
      textColor = "white";
    }
    if (item.category === "Current") {
      badgeColor = "#e74c3c"; // Red
      textColor = "white";
    }
    if (item.category === "Entertainment") {
      badgeColor = "#9b59b6"; // Purple
      textColor = "white";
    }

    card.innerHTML = `
      <div class="news-image-container">
        <img src="${item.image}" alt="${item.title}" class="news-image" loading="lazy" onerror="this.onerror=null; this.src='https://placehold.co/200x150/0a192f/ffffff?text=TOVA+News';">
      </div>
      <div class="news-content">
        <div class="news-meta" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px;">
          <span style="background: ${badgeColor}; color: ${textColor}; padding: 4px 12px; border-radius: 20px; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px;">${item.category}</span>
          <span>${item.date}</span>
        </div>
        <div class="news-title" style="font-weight: bold; margin-bottom: 5px;">
          <a href="${item.url}" style="text-decoration: none; color: inherit;">${item.title}</a>
        </div>
        <div class="news-summary" style="font-size: 13px; color: #666; line-height: 1.4;">
          ${item.summary}
        </div>
      </div>
    `;
    newsContainer.appendChild(card);
  });
}
