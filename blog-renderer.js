import { blogCategories, blogPosts } from './blog-data.js';

document.addEventListener('DOMContentLoaded', () => {
  renderCategories();
  renderPosts('all');
});

function renderCategories() {
  const tabsContainer = document.getElementById('blog-tabs');
  if (!tabsContainer) return;

  blogCategories.forEach(cat => {
    const tab = document.createElement('div');
    tab.className = 'blog-tab';
    tab.dataset.category = cat.id;
    tab.innerHTML = `<i class="fa-solid ${cat.icon}"></i> ${cat.title}`;

    tab.addEventListener('click', () => {
      // Remove active class from all tabs
      document.querySelectorAll('.blog-tab').forEach(t => t.classList.remove('active'));
      // Add active class to clicked tab
      tab.classList.add('active');
      // Render posts for this category
      renderPosts(cat.id);
    });

    tabsContainer.appendChild(tab);
  });

  // Add listener for "All" tab
  const allTab = tabsContainer.querySelector('[data-category="all"]');
  if (allTab) {
    allTab.addEventListener('click', () => {
      document.querySelectorAll('.blog-tab').forEach(t => t.classList.remove('active'));
      allTab.classList.add('active');
      renderPosts('all');
    });
  }
}

function renderPosts(category) {
  const grid = document.getElementById('blog-grid');
  if (!grid) return;

  grid.innerHTML = '';

  const filteredPosts = category === 'all'
    ? blogPosts
    : blogPosts.filter(post => post.category === category);

  if (filteredPosts.length === 0) {
    grid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: #888;">No posts found in this category.</div>';
    return;
  }

  filteredPosts.forEach(post => {
    const catInfo = blogCategories.find(c => c.id === post.category);
    const catTitle = catInfo ? catInfo.title : post.category;

    const card = document.createElement('div');
    card.className = 'blog-card';
    card.innerHTML = `
      <div class="blog-image" style="background-image: url('${post.image}');"></div>
      <div class="blog-content">
        <div class="blog-category">${catTitle}</div>
        <h3 class="blog-title">${post.title}</h3>
        <p class="blog-summary">${post.summary}</p>
        <div class="blog-meta">
          <span><i class="fa-solid fa-user"></i> ${post.author}</span>
          <span><i class="fa-regular fa-clock"></i> ${post.date}</span>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}
