import Storage from './storage.js';

document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initTheme();
    loadRecentItems();
});

function initNavbar() {
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            navbar.style.boxShadow = 'var(--shadow)';
        } else {
            navbar.style.boxShadow = 'none';
        }
    });

    // Handle Active Link
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });
}

function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
}

function loadRecentItems() {
    const recentGrid = document.getElementById('recent-items-grid');
    if (!recentGrid) return;

    const items = Storage.getRecentItems(4);
    recentGrid.innerHTML = items.map(item => createItemCard(item)).join('');
}

export function createItemCard(item) {
    const badgeClass = item.type === 'lost' ? 'badge-lost' : 'badge-found';
    const statusText = item.type.charAt(0).toUpperCase() + item.type.slice(1);
    
    return `
        <div class="card">
            <img src="${item.image || 'https://via.placeholder.com/400x200?text=No+Image'}" alt="${item.name}" class="card-img">
            <div class="card-body">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.5rem;">
                    <h3 class="card-title">${item.name}</h3>
                    <span class="badge ${badgeClass}">${statusText}</span>
                </div>
                <div class="card-meta">
                    <span><i class="fas fa-map-marker-alt"></i> ${item.location}</span>
                    <span><i class="fas fa-calendar-alt"></i> ${item.date}</span>
                </div>
                <p class="text-muted" style="font-size: 0.875rem; margin-bottom: 1.25rem; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
                    ${item.description}
                </p>
                <a href="${item.type}-items.html" class="btn btn-outline" style="width: 100%; padding: 0.5rem;">View Details</a>
            </div>
        </div>
    `;
}

window.toggleTheme = () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
};
