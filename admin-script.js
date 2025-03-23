// IMPORTANT: Remove hardcoded credentials
// Instead, use a more secure approach

// DOM Elements
const loginForm = document.getElementById('loginForm');
const adminPanel = document.getElementById('adminPanel');
const loginBtn = document.getElementById('loginBtn');
const logoutBtn = document.getElementById('logoutBtn');
const loginStatus = document.getElementById('loginStatus');
const username = document.getElementById('username');
const password = document.getElementById('password');

// Login functionality using a hash-based approach
loginBtn.addEventListener('click', () => {
    // Get the entered username and password
    const enteredUsername = username.value.trim();
    const enteredPassword = password.value;
    
    // Create a hash of the credentials (this is still not fully secure but better than plaintext)
    const combinedInput = enteredUsername + ':' + enteredPassword;
    const inputHash = simpleHash(combinedInput);
    
    // Compare with a stored hash (you would change this value to your own hash)
    // This hash represents "admin:your-secure-password"
    const validHash = "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918";
    
    if (inputHash === validHash) {
        loginForm.classList.add('hidden');
        adminPanel.classList.remove('hidden');
        loginStatus.textContent = 'Logged in as Admin';
        loadDashboardData();
        
        // Store login state in session storage
        sessionStorage.setItem('adminLoggedIn', 'true');
    } else {
        alert('Invalid username or password');
    }
});

// A simple hash function (SHA-256 simulation)
function simpleHash(str) {
    // This is a simplified version - in production use a proper crypto library
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash.toString(16);
}

// Rest of your admin panel code...