function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) {
        console.log('Theme toggle button not found, retrying...');
        setTimeout(initThemeToggle, 100);
        return;
    }

    const htmlElement = document.documentElement;

    function setTheme(theme, initial = false) {
        console.log(`Setting theme to: ${theme} (Initial: ${initial})`);
        htmlElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        updateToggleButton(theme);
        updateColors(theme);
        console.log('Theme set to:', htmlElement.getAttribute('data-theme'));
    }

    function updateToggleButton(theme) {
        const icon = themeToggle.querySelector('i');
        if (icon) {
            if (theme === 'dark') {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
                icon.style.color = '#FFD700';
                themeToggle.setAttribute('aria-label', 'Toggle light mode');
            } else {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
                icon.style.color = 'black';
                themeToggle.setAttribute('aria-label', 'Toggle dark mode');
            }
        }
    }

    function updateColors(theme) {
        console.log('Updating colors for theme:', theme);
        // The actual color update is handled by CSS variables
    }

    // Set initial theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme, true);

    // Add event listener to toggle button with debounce
    const debouncedToggle = debounce(function(event) {
        event.preventDefault(); // Prevent any default action
        console.log("Theme toggle Event clicked");
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    }, 250); // 250ms debounce time

    themeToggle.addEventListener('click', debouncedToggle);

    console.log('Theme toggle initialized');
}

// Start the initialization process
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initThemeToggle);
} else {
    initThemeToggle();
}