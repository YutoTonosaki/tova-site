const pollQuestions = [
  {
    id: 1,
    question: "Breakfast: Bread or Rice?",
    options: ["Bread", "Rice", "Skip"]
  },
  {
    id: 2,
    question: "Dog person or Cat person?",
    options: ["Dog", "Cat", "Other"]
  },
  {
    id: 3,
    question: "How do you spend holidays?",
    options: ["Outdoor", "Indoor", "Sleep"]
  },
  {
    id: 4,
    question: "Favorite Season?",
    options: ["Summer", "Winter", "Spring/Fall"]
  }
];

// Get a random question based on the day of the year to keep it consistent for everyone (mock)
// For now, just random on load for demo purposes, or fixed for simplicity.
// Let's use a fixed rotation based on date.
const today = new Date();
const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
const questionIndex = dayOfYear % pollQuestions.length;
const currentPoll = pollQuestions[questionIndex];

document.addEventListener("DOMContentLoaded", () => {
  renderPoll();
});

function renderPoll() {
  const container = document.getElementById("poll-widget-container");
  if (!container) return;

  // Check if user has already voted
  const votedOption = localStorage.getItem(`poll_vote_${currentPoll.id}`);

  if (votedOption) {
    showResults(container, votedOption);
  } else {
    showOptions(container);
  }
}

function showOptions(container) {
  let html = `
    <div class="widget-header">
      <span><i class="fa-solid fa-square-poll-vertical"></i> Daily Poll</span>
    </div>
    <div class="poll-question" style="font-weight:bold; margin-bottom:15px; color:var(--navy);">
      Q. ${currentPoll.question}
    </div>
    <div class="poll-options">
  `;

  currentPoll.options.forEach((opt, index) => {
    html += `
      <button class="poll-option-btn" onclick="vote(${index})">
        ${opt}
      </button>
    `;
  });

  html += `</div>`;
  container.innerHTML = html;
}

window.vote = (optionIndex) => {
  localStorage.setItem(`poll_vote_${currentPoll.id}`, optionIndex);
  renderPoll();
};

function showResults(container, userVote) {
  // Mock random results
  // In a real app, you'd fetch aggregate data here.
  // We'll generate pseudo-random percentages that add up to 100.

  // Seed random based on question ID to be consistent
  const seed = currentPoll.id * 123;
  let percentages = [];
  let remaining = 100;

  currentPoll.options.forEach((_, i) => {
    if (i === currentPoll.options.length - 1) {
      percentages.push(remaining);
    } else {
      const val = Math.floor(Math.random() * (remaining - 10)) + 5; // Min 5%
      percentages.push(val);
      remaining -= val;
    }
  });

  // Shuffle slightly or just use as is. 
  // Let's just use them.

  let html = `
    <div class="widget-header">
      <span><i class="fa-solid fa-square-poll-vertical"></i> Daily Poll</span>
    </div>
    <div class="poll-question" style="font-weight:bold; margin-bottom:15px; color:var(--navy);">
      Q. ${currentPoll.question}
    </div>
    <div class="poll-results">
  `;

  currentPoll.options.forEach((opt, index) => {
    const isUserVote = index == userVote;
    const percent = percentages[index];

    html += `
      <div class="poll-result-item" style="margin-bottom:10px;">
        <div style="display:flex; justify-content:space-between; font-size:13px; margin-bottom:4px;">
          <span>${opt} ${isUserVote ? '<i class="fa-solid fa-check-circle" style="color:var(--mint-dark);"></i>' : ''}</span>
          <span>${percent}%</span>
        </div>
        <div class="progress-bar-bg" style="background:#eee; height:8px; border-radius:4px; overflow:hidden;">
          <div class="progress-bar-fill" style="width:${percent}%; background:${isUserVote ? 'var(--yellow-accent)' : 'var(--navy)'}; height:100%;"></div>
        </div>
      </div>
    `;
  });

  html += `
    <div style="text-align:center; margin-top:15px; font-size:12px; color:#888;">
      Total votes: ${Math.floor(Math.random() * 500) + 100}
    </div>
  `;

  container.innerHTML = html;
}
