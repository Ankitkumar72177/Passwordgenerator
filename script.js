// Update length value display
const lengthSlider = document.getElementById('length');
const lengthValue = document.getElementById('lengthValue');
lengthSlider.addEventListener('input', () => {
    lengthValue.textContent = lengthSlider.value;
});

function generatePassword() {
    const length = document.getElementById('length').value;
    const uppercase = document.getElementById('uppercase').checked;
    const lowercase = document.getElementById('lowercase').checked;
    const numbers = document.getElementById('numbers').checked;
    const symbols = document.getElementById('symbols').checked;

    if (!uppercase && !lowercase && !numbers && !symbols) {
        alert('Please select at least one character type');
        return;
    }

    let chars = '';
    if (uppercase) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (lowercase) chars += 'abcdefghijklmnopqrstuvwxyz';
    if (numbers) chars += '0123456789';
    if (symbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        password += chars[randomIndex];
    }

    document.getElementById('passwordDisplay').textContent = password;
}

function copyPassword() {
    const passwordDisplay = document.getElementById('passwordDisplay');
    const password = passwordDisplay.textContent;
    
    if (password === 'Click Generate to create password') {
        alert('Generate a password first!');
        return;
    }

    navigator.clipboard.writeText(password)
        .then(() => {
            const copyBtn = document.querySelector('.copy-btn i');
            copyBtn.className = 'fas fa-check';
            setTimeout(() => {
                copyBtn.className = 'far fa-copy';
            }, 1500);
        })
        .catch(err => {
            console.error('Failed to copy password:', err);
            alert('Failed to copy password to clipboard');
        });
}

// Theme management
const themeToggle = document.querySelector('.theme-toggle');
const container = document.querySelector('.container');

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    document.body.classList.add('light-theme');
    themeToggle.classList.replace('fa-sun', 'fa-moon');
}

themeToggle.addEventListener('click', () => {
    // Add transition class
    container.classList.add('theme-transition');
    
    // Toggle theme
    document.body.classList.toggle('light-theme');
    themeToggle.classList.toggle('fa-sun');
    themeToggle.classList.toggle('fa-moon');
    
    // Save theme preference
    const currentTheme = document.body.classList.contains('light-theme') ? 'light' : 'dark';
    localStorage.setItem('theme', currentTheme);
    
    // Remove transition class after animation
    setTimeout(() => {
        container.classList.remove('theme-transition');
    }, 300);
});
