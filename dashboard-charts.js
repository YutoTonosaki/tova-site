// Mock Data for Charts
const fuelPriceData = {
  labels: ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'],
  datasets: [{
    label: 'Diesel Price (JPY/L)',
    data: [145, 148, 152, 150, 148, 146],
    borderColor: '#0a192f', // Navy
    backgroundColor: 'rgba(10, 25, 47, 0.1)',
    tension: 0.3,
    pointBackgroundColor: '#f1c40f', // Yellow
    pointBorderColor: '#0a192f',
    borderWidth: 2
  }]
};

const exchangeRateDataJPY = {
  labels: ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'],
  datasets: [{
    label: 'USD/JPY',
    data: [155, 158, 160, 152, 148, 145],
    borderColor: '#e67e22',
    backgroundColor: 'rgba(230, 126, 34, 0.1)',
    tension: 0.3,
    pointBackgroundColor: '#f1c40f',
    pointBorderColor: '#e67e22',
    borderWidth: 2
  }]
};

const exchangeRateDataCNY = {
  labels: ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'],
  datasets: [{
    label: 'USD/CNY',
    data: [7.24, 7.27, 7.29, 7.15, 7.12, 7.10], // Mock data
    borderColor: '#e67e22',
    backgroundColor: 'rgba(230, 126, 34, 0.1)',
    tension: 0.3,
    pointBackgroundColor: '#f1c40f',
    pointBorderColor: '#e67e22',
    borderWidth: 2
  }]
};

const exchangeRateDataKRW = {
  labels: ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'],
  datasets: [{
    label: 'USD/KRW',
    data: [1370, 1385, 1390, 1350, 1340, 1330], // Mock data
    borderColor: '#e67e22',
    backgroundColor: 'rgba(230, 126, 34, 0.1)',
    tension: 0.3,
    pointBackgroundColor: '#f1c40f',
    pointBorderColor: '#e67e22',
    borderWidth: 2
  }]
};

let fuelChartInstance = null;
let exchangeChartInstance = null;

const chartTranslations = {
  en: {
    months: ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'],
    fuelTitle: 'Fuel Price Trend',
    fuelLabel: 'Diesel Price (JPY/L)',
    exchangeTitle: 'Exchange Rate Trend',
    exchangeLabel: 'USD/JPY'
  },
  ja: {
    months: ['6月', '7月', '8月', '9月', '10月', '11月'],
    fuelTitle: '燃料価格推移',
    fuelLabel: '軽油価格 (円/L)',
    exchangeTitle: '為替レート推移',
    exchangeLabel: 'USD/JPY'
  },
  ko: {
    months: ['6월', '7월', '8월', '9월', '10월', '11월'],
    fuelTitle: '연료 가격 추이',
    fuelLabel: '경유 가격 (엔/L)',
    exchangeTitle: '환율 추이',
    exchangeLabel: 'USD/KRW'
  },
  zh: {
    months: ['6月', '7月', '8月', '9月', '10月', '11月'],
    fuelTitle: '燃油价格走势',
    fuelLabel: '柴油价格 (日元/L)',
    exchangeTitle: '汇率走势',
    exchangeLabel: 'USD/CNY'
  }
};

function getExchangeData(lang) {
  if (lang === 'zh') return exchangeRateDataCNY;
  if (lang === 'ko') return exchangeRateDataKRW;
  return exchangeRateDataJPY;
}

function initCharts() {
  const commonOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: { boxWidth: 10, font: { size: 10, family: 'Quicksand' }, color: '#0a192f' }
      },
      title: { display: true, color: '#0a192f', font: { family: 'Outfit', weight: 'bold' } }
    },
    scales: {
      x: {
        grid: { display: false }, // Remove grid lines
        ticks: { color: '#64748b' }
      },
      y: {
        beginAtZero: false,
        grid: { display: false }, // Remove grid lines
        ticks: { color: '#64748b' }
      }
    }
  };

  const fuelCtx = document.getElementById('fuelChart');
  const exchangeCtx = document.getElementById('exchangeChart');

  // Get current language or default to en
  const currentLang = localStorage.getItem("tova_lang") || "en";
  const t = chartTranslations[currentLang] || chartTranslations.en;

  // Update initial data with translation
  fuelPriceData.labels = t.months;
  fuelPriceData.datasets[0].label = t.fuelLabel;

  const initialExchangeData = getExchangeData(currentLang);
  initialExchangeData.labels = t.months;
  initialExchangeData.datasets[0].label = t.exchangeLabel;

  if (fuelCtx) {
    const options = JSON.parse(JSON.stringify(commonOptions));
    options.plugins.title.text = t.fuelTitle;
    fuelChartInstance = new Chart(fuelCtx, {
      type: 'line',
      data: fuelPriceData,
      options: options
    });
  }

  if (exchangeCtx) {
    const options = JSON.parse(JSON.stringify(commonOptions));
    options.plugins.title.text = t.exchangeTitle;
    exchangeChartInstance = new Chart(exchangeCtx, {
      type: 'line',
      data: initialExchangeData,
      options: options
    });
  }
}

function updateCharts(lang) {
  const t = chartTranslations[lang] || chartTranslations.en;

  if (fuelChartInstance) {
    fuelChartInstance.data.labels = t.months;
    fuelChartInstance.data.datasets[0].label = t.fuelLabel;
    fuelChartInstance.options.plugins.title.text = t.fuelTitle;
    fuelChartInstance.update();
  }

  if (exchangeChartInstance) {
    const newData = getExchangeData(lang);

    // Update data points
    exchangeChartInstance.data.datasets[0].data = newData.datasets[0].data;

    // Update labels
    exchangeChartInstance.data.labels = t.months;
    exchangeChartInstance.data.datasets[0].label = t.exchangeLabel;
    exchangeChartInstance.options.plugins.title.text = t.exchangeTitle;
    exchangeChartInstance.update();
  }
}

// Listen for language changes
window.addEventListener("languageChanged", (e) => {
  updateCharts(e.detail.language);
});

// Initialize on load
document.addEventListener("DOMContentLoaded", initCharts);
