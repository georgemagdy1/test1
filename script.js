// DOM Elements
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const registerLink = document.getElementById('registerLink');
const loginLink = document.getElementById('loginLink');
const messageDiv = document.getElementById('message');

// Mock user database (in real application, this would be on a server)
let users = JSON.parse(localStorage.getItem('users')) || [];

// Show/Hide Message
function showMessage(text, type) {
    messageDiv.textContent = text;
    messageDiv.className = `message ${type}`;
    setTimeout(() => {
        messageDiv.className = 'message';
    }, 3000);
}

// Toggle between Login and Register forms
registerLink.addEventListener('click', (e) => {
    e.preventDefault();
    loginForm.style.display = 'none';
    registerForm.style.display = 'block';
    document.querySelector('.form-box h2').textContent = 'Register';
});

loginLink.addEventListener('click', (e) => {
    e.preventDefault();
    registerForm.style.display = 'none';
    loginForm.style.display = 'block';
    document.querySelector('.form-box h2').textContent = 'Login';
});

// Handle Registration
registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const username = document.getElementById('regUsername').value;
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Validation
    if (password !== confirmPassword) {
        showMessage('Passwords do not match!', 'error');
        return;
    }

    if (password.length < 6) {
        showMessage('Password must be at least 6 characters long!', 'error');
        return;
    }

    // Check if user already exists
    if (users.some(user => user.email === email)) {
        showMessage('Email already registered!', 'error');
        return;
    }

    // Add new user
    users.push({
        username,
        email,
        password // In a real application, this should be hashed!
    });

    // Save to localStorage
    localStorage.setItem('users', JSON.stringify(users));

    showMessage('Registration successful!', 'success');
    registerForm.reset();

    // Switch to login form
    setTimeout(() => {
        loginLink.click();
    }, 1500);
});

// Handle Login
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const rememberMe = document.getElementById('rememberMe').checked;

    // Find user
    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
        // In a real application, you would receive a token from the server
        if (rememberMe) {
            localStorage.setItem('currentUser', JSON.stringify(user));
        } else {
            sessionStorage.setItem('currentUser', JSON.stringify(user));
        }

        showMessage('Login successful!', 'success');
        loginForm.reset();

        // Redirect to dashboard (in this example, we'll just show an alert)
        setTimeout(() => {
            alert(`Welcome back, ${user.username}!`);
        }, 1500);
    } else {
        showMessage('Invalid email or password!', 'error');
    }
});

// Check if user is already logged in
const currentUser = JSON.parse(localStorage.getItem('currentUser')) || JSON.parse(sessionStorage.getItem('currentUser'));
if (currentUser) {
    alert(`Welcome back, ${currentUser.username}!`);
} 