import { cafeBoards, cafeGroups, cafeThreads } from "./cafe-data.js";

// State
let currentBoardFilter = null;

function renderBoards() {
  const container = document.getElementById("cafe-boards-list");
  if (!container) return;

  container.innerHTML = "";
  cafeBoards.forEach(board => {
    const el = document.createElement("div");
    el.className = "cafe-board-card";
    if (currentBoardFilter === board.id) {
      el.style.borderColor = "var(--yellow-accent)";
      el.style.backgroundColor = "var(--mint-light)";
    }

    el.innerHTML = `
      <div class="board-icon"><i class="fa-solid ${board.icon}"></i></div>
      <div class="board-info">
        <h3 data-i18n="cafe.board.${board.id}">${board.title}</h3>
        <p data-i18n="cafe.board.${board.id}.desc">${board.desc}</p>
      </div>
    `;

    // Click to filter
    el.addEventListener("click", () => {
      if (currentBoardFilter === board.id) {
        currentBoardFilter = null; // Toggle off
      } else {
        currentBoardFilter = board.id;
      }
      renderBoards(); // Re-render to update active state
      renderThreads(); // Filter threads
      showList(); // Ensure list is visible
    });

    container.appendChild(el);
  });
}

function renderGroups() {
  const container = document.getElementById("cafe-groups-list");
  if (!container) return;

  container.innerHTML = "";
  cafeGroups.forEach(group => {
    const el = document.createElement("div");
    el.className = "cafe-group-card";
    el.innerHTML = `
      <div class="group-header">
        <i class="fa-solid ${group.icon}"></i>
        <span class="group-type">${group.type}</span>
      </div>
      <h4 data-i18n="cafe.group.${group.id}">${group.title}</h4>
      <div class="group-meta">
        <i class="fa-solid fa-users"></i> ${group.members.toLocaleString()} Members
      </div>
      <button class="btn btn-outline btn-sm" style="width: 100%; margin-top: 10px;">Join</button>
    `;
    container.appendChild(el);
  });
}

function renderThreads() {
  const container = document.getElementById("cafe-threads-list");
  if (!container) return;

  container.innerHTML = "";

  // Filter threads
  const filteredThreads = currentBoardFilter
    ? cafeThreads.filter(t => t.boardId === currentBoardFilter)
    : cafeThreads;

  if (filteredThreads.length === 0) {
    container.innerHTML = `<div style="padding: 20px; text-align: center; color: #888;">No threads found in this board.</div>`;
    return;
  }

  filteredThreads.forEach(thread => {
    const el = document.createElement("div");
    el.className = "cafe-thread-item";
    el.innerHTML = `
      <div class="thread-main">
        <div class="thread-title">
          <span class="thread-tag">${thread.boardId.toUpperCase()}</span>
          <a href="#" class="thread-link">${thread.title}</a>
        </div>
        <div class="thread-meta">
          <span>by ${thread.author}</span>
          <span>${thread.date}</span>
        </div>
      </div>
      <div class="thread-stats">
        <div class="stat"><i class="fa-regular fa-comment"></i> ${thread.replies}</div>
        <div class="stat"><i class="fa-regular fa-eye"></i> ${thread.views}</div>
      </div>
    `;

    // Click to view detail
    const link = el.querySelector(".thread-link");
    link.addEventListener("click", (e) => {
      e.preventDefault();
      showThreadDetail(thread);
    });

    container.appendChild(el);
  });
}

function showThreadDetail(thread) {
  const listContainer = document.getElementById("cafe-threads-list");
  const detailContainer = document.getElementById("cafe-thread-detail");

  if (!listContainer || !detailContainer) return;

  listContainer.style.display = "none";
  detailContainer.style.display = "block";

  // Render Comments HTML
  const renderComments = () => {
    return thread.comments.map(c => `
      <div style="background: #f9f9f9; padding: 15px; border-radius: 8px; margin-bottom: 10px;">
        <div style="font-size: 12px; font-weight: bold; margin-bottom: 5px;">${c.author} <span style="font-weight: normal; color: #888; margin-left: 10px;">${c.date}</span></div>
        <div style="font-size: 14px;">${c.content}</div>
      </div>
    `).join("");
  };

  // Detail View HTML
  detailContainer.innerHTML = `
    <button id="back-to-list" class="btn btn-outline" style="font-size: 12px; margin-bottom: 15px; padding: 5px 10px;">
      <i class="fa-solid fa-arrow-left"></i> Back to List
    </button>
    
    <div style="border-bottom: 1px solid #eee; padding-bottom: 15px; margin-bottom: 15px;">
      <span class="thread-tag" style="font-size: 12px; background: var(--mint-light); color: var(--mint-dark); padding: 2px 8px; border-radius: 4px;">${thread.boardId.toUpperCase()}</span>
      <h2 style="margin: 10px 0; font-size: 22px; color: var(--navy);">${thread.title}</h2>
      <div style="font-size: 13px; color: #666; display: flex; gap: 15px;">
        <span><i class="fa-solid fa-user"></i> ${thread.author}</span>
        <span><i class="fa-regular fa-clock"></i> ${thread.date}</span>
        <span><i class="fa-regular fa-eye"></i> ${thread.views} views</span>
      </div>
    </div>
    
    <div class="thread-content" style="font-size: 15px; line-height: 1.6; color: #333; margin-bottom: 30px;">
      <p>${thread.content || "No content available."}</p>
    </div>
    
    <div class="thread-comments">
      <h4 style="margin-bottom: 15px; color: var(--navy);">Comments (<span id="comment-count">${thread.comments.length}</span>)</h4>
      
      <div id="comments-container">
        ${renderComments()}
      </div>

      <!-- Comment Form -->
      <div style="margin-top: 20px; border-top: 1px solid #eee; padding-top: 20px;">
        <h5 style="margin-bottom: 10px;">Leave a comment</h5>
        <textarea id="new-comment-text" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 8px; font-family: inherit; font-size: 14px; resize: vertical; min-height: 80px;" placeholder="Write your thoughts..."></textarea>
        <button id="post-comment-btn" class="btn btn-mint" style="margin-top: 10px; padding: 8px 20px; font-size: 14px;">Post Comment</button>
      </div>
    </div>
  `;

  // Back Button Logic
  document.getElementById("back-to-list").addEventListener("click", () => {
    showList();
  });

  // Post Comment Logic
  document.getElementById("post-comment-btn").addEventListener("click", () => {
    const textarea = document.getElementById("new-comment-text");
    const content = textarea.value.trim();

    if (content) {
      // Add new comment
      const newComment = {
        author: "You", // In a real app, use logged-in user's name
        date: "Just now",
        content: content
      };

      thread.comments.push(newComment);

      // Update UI
      const commentsContainer = document.getElementById("comments-container");
      const countSpan = document.getElementById("comment-count");

      // Append new comment HTML
      const newCommentHtml = `
        <div style="background: #f9f9f9; padding: 15px; border-radius: 8px; margin-bottom: 10px; border-left: 4px solid var(--yellow-accent);">
          <div style="font-size: 12px; font-weight: bold; margin-bottom: 5px;">${newComment.author} <span style="font-weight: normal; color: #888; margin-left: 10px;">${newComment.date}</span></div>
          <div style="font-size: 14px;">${newComment.content}</div>
        </div>
      `;
      commentsContainer.insertAdjacentHTML('beforeend', newCommentHtml);

      // Update count
      countSpan.textContent = thread.comments.length;

      // Clear input
      textarea.value = "";
    }
  });
}

function showList() {
  const listContainer = document.getElementById("cafe-threads-list");
  const detailContainer = document.getElementById("cafe-thread-detail");

  if (!listContainer || !detailContainer) return;

  listContainer.style.display = "block";
  detailContainer.style.display = "none";
}

document.addEventListener("DOMContentLoaded", () => {
  renderBoards();
  renderGroups();
  renderThreads();
});
