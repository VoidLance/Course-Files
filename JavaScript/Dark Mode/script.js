// Theme Toggle Functionality
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Load saved theme preference
const savedTheme = localStorage.getItem('theme') || 'light';
if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    updateToggleButton(true);
}

// Theme toggle event listener
themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const isDarkMode = body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    updateToggleButton(isDarkMode);
});

// Update button text and appearance
function updateToggleButton(isDarkMode) {
    if (isDarkMode) {
        themeToggle.textContent = '☀️ Light Mode';
        themeToggle.style.background = '#f59e0b';
    } else {
        themeToggle.textContent = '🌙 Dark Mode';
        themeToggle.style.background = '#4a90e2';
    }
}
