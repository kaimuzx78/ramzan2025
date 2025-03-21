// Fixed credentials for GitHub Pages (since we can't use server-side authentication)
// In a real app, you would never store credentials in client-side code
const ADMIN_CREDENTIALS = {
    username: "admin",
    password: "ramadan2025"
};

// DOM Elements
const loginForm = document.getElementById('loginForm');
const adminPanel = document.getElementById('adminPanel');
const loginBtn = document.getElementById('loginBtn');
const logoutBtn = document.getElementById('logoutBtn');
const loginStatus = document.getElementById('loginStatus');
const username = document.getElementById('username');
const password = document.getElementById('password');

// Stats elements
const totalVisitors = document.getElementById('totalVisitors');
const todayVisitors = document.getElementById('todayVisitors');
const activeUsers = document.getElementById('activeUsers');
const visitorList = document.getElementById('visitorList');

// Sample visitor data (stored locally in this demo)
let visitors = [];

// Check if we have stored visitor data
if (localStorage.getItem('visitorData')) {
    try {
        visitors = JSON.parse(localStorage.getItem('visitorData'));
    } catch (e) {
        console.error('Error loading visitor data', e);
        // Initialize with sample data if there's an error
        initSampleData();
    }
} else {
    // Initialize with sample data
    initSampleData();
}

// Initialize with sample data
function initSampleData() {
    visitors = [
        { ip: '192.168.1.1', location: 'New York, US', datetime: getCurrentDate() + ' 14:30:45', device: 'Chrome/Windows' },
        { ip: '10.0.0.2', location: 'London, UK', datetime: getCurrentDate() + ' 10:22:18', device: 'Safari/iOS' },
        { ip: '172.16.0.5', location: 'Tokyo, Japan', datetime: getCurrentDate() + ' 08:15:33', device: 'Firefox/Mac' },
        { ip: '192.168.1.10', location: 'Sydney, Australia', datetime: getPreviousDate(1) + ' 22:45:12', device: 'Chrome/Android' },
        { ip: '10.0.0.15', location: 'Berlin, Germany', datetime: getPreviousDate(1) + ' 16:38:27', device: 'Edge/Windows' },
        { ip: '172.16.0.20', location: 'Paris, France', datetime: getPreviousDate(1) + ' 15:10:05', device: 'Safari/Mac' },
        { ip: '192.168.1.25', location: 'Toronto, Canada', datetime: getPreviousDate(2) + ' 19:55:41', device: 'Chrome/Windows' },
        { ip: '10.0.0.30', location: 'Mumbai, India', datetime: getPreviousDate(2) + ' 12:30:18', device: 'Chrome/Android' }
    ];
    saveVisitorData();
}

// Helper function to get current date in YYYY-MM-DD format
function getCurrentDate() {
    const now = new Date();
    return now.getFullYear() + '-' + 
           String(now.getMonth() + 1).padStart(2, '0') + '-' + 
           String(now.getDate()).padStart(2, '0');
}

// Helper function to get previous date
function getPreviousDate(daysAgo) {
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    return date.getFullYear() + '-' + 
           String(date.getMonth() + 1).padStart(2, '0') + '-' + 
           String(date.getDate()).padStart(2, '0');
}

// Save visitor data to localStorage
function saveVisitorData() {
    localStorage.setItem('visitorData', JSON.stringify(visitors));
}

// Login functionality - simplified for GitHub Pages
loginBtn.addEventListener('click', () => {
    if (username.value === ADMIN_CREDENTIALS.username && 
        password.value === ADMIN_CREDENTIALS.password) {
        
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

// Logout functionality
logoutBtn.addEventListener('click', () => {
    loginForm.classList.remove('hidden');
    adminPanel.classList.add('hidden');
    loginStatus.textContent = 'Not logged in';
    username.value = '';
    password.value = '';
    
    // Clear login state
    sessionStorage.removeItem('adminLoggedIn');
});

// Check if already logged in
function checkLoginState() {
    if (sessionStorage.getItem('adminLoggedIn') === 'true') {
        loginForm.classList.add('hidden');
        adminPanel.classList.remove('hidden');
        loginStatus.textContent = 'Logged in as Admin';
        loadDashboardData();
    }
}

// Filter buttons
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        filterVisitors(btn.dataset.filter);
    });
});

// Add this function to fetch real data from Google Analytics
async function fetchRealVisitorData() {
    // Check if Google Analytics is available
    if (typeof gtag === 'undefined') {
        console.log('Google Analytics not detected, using sample data');
        return;
    }
    
    try {
        // This is a simplified example - in reality, you would need to use the Google Analytics API
        // which requires proper authentication and setup
        console.log('Attempting to fetch real visitor data from Google Analytics');
        
        // For now, we'll continue using the sample data
        // In a real implementation, you would make API calls to Google Analytics here
    } catch (error) {
        console.error('Error fetching real visitor data:', error);
    }
}

// Update the loadDashboardData function to use the real visitor data
function loadDashboardData() {
    // Get real visitor count from localStorage
    const realVisitorCount = localStorage.getItem('totalVisitors') || '0';
    totalVisitors.textContent = realVisitorCount;
    
    // Get real visit data
    let realVisits = [];
    try {
        realVisits = JSON.parse(localStorage.getItem('visits') || '[]');
    } catch (e) {
        console.error('Error parsing visit data', e);
    }
    
    // Count today's visitors
    const today = new Date().toISOString().split('T')[0];
    const todayCount = realVisits.filter(v => v.datetime.startsWith(today)).length;
    todayVisitors.textContent = todayCount;
    
    // Active users (visitors in the last hour)
    const oneHourAgo = new Date();
    oneHourAgo.setHours(oneHourAgo.getHours() - 1);
    const activeCount = realVisits.filter(v => new Date(v.datetime) > oneHourAgo).length;
    activeUsers.textContent = activeCount;
    
    // Convert the real visits to our visitor format for display
    visitors = realVisits.map(visit => {
        const date = new Date(visit.datetime);
        const formattedDate = date.toISOString().split('T')[0] + ' ' + 
                             date.toTimeString().split(' ')[0];
        return {
            ip: 'Local User',
            location: 'Local',
            datetime: formattedDate,
            device: visit.device
        };
    });
    
    // Load visitor list
    filterVisitors('all');
}

// Filter visitors based on selected filter
function filterVisitors(filter) {
    let filteredVisitors = [];
    const todayDate = getCurrentDate();
    const yesterdayDate = getPreviousDate(1);
    const twoDaysAgoDate = getPreviousDate(2);
    
    switch(filter) {
        case 'today':
            filteredVisitors = visitors.filter(v => v.datetime.startsWith(todayDate));
            break;
        case 'week':
            filteredVisitors = visitors.filter(v => 
                v.datetime.startsWith(todayDate) || 
                v.datetime.startsWith(yesterdayDate) || 
                v.datetime.startsWith(twoDaysAgoDate));
            break;
        default:
            filteredVisitors = visitors;
    }
    
    renderVisitorList(filteredVisitors);
}

// Render visitor list
function renderVisitorList(visitors) {
    visitorList.innerHTML = '';
    
    if (visitors.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = '<td colspan="4" style="text-align: center;">No visitors found</td>';
        visitorList.appendChild(row);
        return;
    }
    
    visitors.forEach(visitor => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${visitor.ip}</td>
            <td>${visitor.location}</td>
            <td>${visitor.datetime}</td>
            <td>${visitor.device}</td>
        `;
        visitorList.appendChild(row);
    });
}

// Add a new visitor (simulated for GitHub Pages)
function addVisitor() {
    // In a real app, this would be triggered by actual visits
    // For demo purposes, we'll add a random visitor when the admin page loads
    const locations = ['New York, US', 'London, UK', 'Tokyo, Japan', 'Sydney, Australia', 'Berlin, Germany', 'Paris, France', 'Toronto, Canada', 'Mumbai, India'];
    const devices = ['Chrome/Windows', 'Safari/iOS', 'Firefox/Mac', 'Chrome/Android', 'Edge/Windows', 'Safari/Mac'];
    
    const randomIP = `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
    const randomLocation = locations[Math.floor(Math.random() * locations.length)];
    const randomDevice = devices[Math.floor(Math.random() * devices.length)];
    
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const datetime = `${getCurrentDate()} ${hours}:${minutes}:${seconds}`;
    
    const newVisitor = {
        ip: randomIP,
        location: randomLocation,
        datetime: datetime,
        device: randomDevice
    };
    
    visitors.push(newVisitor);
    saveVisitorData();
}

// Initialize
checkLoginState();
addVisitor(); // Add a simulated visitor for demo purposes

// Add tracking code to index.html
// This is just a placeholder since we can't actually track visitors without a server
console.log('Admin panel initialized. Username: admin, Password: ramadan2025'); 