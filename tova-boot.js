// Google Analytics Measurement ID
// TODO: Replace with your actual Measurement ID (e.g., G-XXXXXXXXXX)
const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX';

document.addEventListener("DOMContentLoaded", () => {
  // Check immediately if body is available, otherwise wait
  if (document.body) {
    checkPrivacyStatus();
  } else {
    window.addEventListener('load', checkPrivacyStatus);
  }
});

function checkPrivacyStatus() {
  const status = localStorage.getItem("privacy_accepted");

  if (status === "true") {
    loadAnalytics();
  } else if (!status) {
    showPrivacyNotice();
  }
}

function showPrivacyNotice() {
  // Create Banner Element
  const banner = document.createElement("div");
  banner.id = "privacy-notice";
  banner.className = "privacy-notice fade-in";
  banner.innerHTML = `
    <div class="notice-content">
      <p>
        We use technologies to improve your experience and analyze site traffic. 
        By clicking "Accept", you consent to these terms. 
        <a href="privacy.html">Learn more</a>.
      </p>
      <div class="notice-buttons">
        <button id="privacy-decline" class="btn btn-outline btn-sm">Decline</button>
        <button id="privacy-accept" class="btn btn-mint btn-sm">Accept</button>
      </div>
    </div>
  `;

  document.body.appendChild(banner);

  // Add Event Listeners
  document.getElementById("privacy-accept").addEventListener("click", () => {
    localStorage.setItem("privacy_accepted", "true");
    removeNotice();
    loadAnalytics();
  });

  document.getElementById("privacy-decline").addEventListener("click", () => {
    localStorage.setItem("privacy_accepted", "false");
    removeNotice();
  });
}

function removeNotice() {
  const banner = document.getElementById("privacy-notice");
  if (banner) {
    banner.classList.remove("fade-in");
    banner.style.opacity = "0";
    setTimeout(() => banner.remove(), 300);
  }
}

function loadAnalytics() {
  if (!GA_MEASUREMENT_ID || GA_MEASUREMENT_ID === 'G-XXXXXXXXXX') {
    console.warn("Analytics: Measurement ID not set.");
    return;
  }

  // Inject Gtag Script
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  // Initialize Gtag
  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  gtag('js', new Date());
  gtag('config', GA_MEASUREMENT_ID);
}
