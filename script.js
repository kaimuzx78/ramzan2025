const ramzanData = [
    { ramzanDay: "16", date: "17", sehri: "5:22", iftar: "6:51" },
    { ramzanDay: "17", date: "18", sehri: "5:21", iftar: "6:51" },
    { ramzanDay: "18", date: "19", sehri: "5:20", iftar: "6:51" },
    { ramzanDay: "19", date: "20", sehri: "5:19", iftar: "6:52" },
    { ramzanDay: "20", date: "21", sehri: "5:19", iftar: "6:52" },
    { ramzanDay: "21", date: "22", sehri: "5:18", iftar: "6:52" },
    { ramzanDay: "22", date: "23", sehri: "5:18", iftar: "6:52" },
    { ramzanDay: "23", date: "24", sehri: "5:17", iftar: "6:53" },
    { ramzanDay: "24", date: "25", sehri: "5:16", iftar: "6:53" },
    { ramzanDay: "25", date: "26", sehri: "5:15", iftar: "6:53" },
    { ramzanDay: "26", date: "27", sehri: "5:14", iftar: "6:54" },
    { ramzanDay: "27", date: "28", sehri: "5:13", iftar: "6:54" },
    { ramzanDay: "28", date: "29", sehri: "5:12", iftar: "6:54" },
    { ramzanDay: "29", date: "30", sehri: "5:11", iftar: "6:55" },
    { ramzanDay: "30", date: "31", sehri: "5:10", iftar: "6:55" }
];

const showCalendarBtn = document.getElementById('showCalendarBtn');
const calendarWrapper = document.getElementById('calendarWrapper');

showCalendarBtn.addEventListener('click', () => {
    calendarWrapper.classList.toggle('hidden');
    showCalendarBtn.textContent = calendarWrapper.classList.contains('hidden') 
        ? 'Show Full Calendar' 
        : 'Hide Calendar';
});

function populateCalendarTable() {
    const tableBody = document.getElementById('calendarBody');
    tableBody.innerHTML = '';
    
    const today = new Date();
    const currentDate = today.getDate();
    
    ramzanData.forEach((day, index) => {
        const row = document.createElement('tr');
        if (parseInt(day.date) === currentDate && 
            today.getMonth() === 2 && 
            today.getFullYear() === 2025) {
            row.classList.add('current-row');
        }
        
        const isLastDay = index === ramzanData.length - 1;
        row.innerHTML = `
            <td>${day.ramzanDay}</td>
            <td>${day.date} Mar</td>
            <td>${day.sehri}</td>
            <td>${day.iftar}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Function to update times based on current time of day
function updateTimes() {
    const today = new Date();
    const march2025 = today.getMonth() === 2 && today.getFullYear() === 2025;
    
    if (march2025) {
        const dayOfMonth = today.getDate();
        const currentHour = today.getHours();
        const currentMinute = today.getMinutes();
        const currentTimeInMinutes = currentHour * 60 + currentMinute;
        
        // Find current day's data
        const ramzanDay = ramzanData.find(day => parseInt(day.date) === dayOfMonth);
        
        if (ramzanDay) {
            // Parse iftar time to check if it's passed
            const [iftarHour, iftarMinute] = ramzanDay.iftar.split(':').map(num => parseInt(num));
            // Convert to 24-hour format (assuming iftar is PM)
            const iftarHour24 = iftarHour < 12 ? iftarHour + 12 : iftarHour;
            const iftarTimeInMinutes = iftarHour24 * 60 + iftarMinute;
            
            // Check if current time is past iftar time
            if (currentTimeInMinutes > iftarTimeInMinutes) {
                // Find the next day's data
                const currentDayIndex = ramzanData.findIndex(day => parseInt(day.date) === dayOfMonth);
                const nextDayData = ramzanData[currentDayIndex + 1];
                
                if (nextDayData) {
                    // Show next day's times without "Tomorrow" label
                    document.getElementById('currentDay').textContent = `${nextDayData.ramzanDay} (${nextDayData.date} March 2025)`;
                    document.getElementById('sehriTime').textContent = nextDayData.sehri;
                    document.getElementById('iftarTime').textContent = nextDayData.iftar;
                } else {
                    // If it's the last day of Ramzan
                    document.getElementById('currentDay').textContent = `${ramzanDay.ramzanDay} (${dayOfMonth} March 2025)`;
                    document.getElementById('sehriTime').textContent = ramzanDay.sehri;
                    document.getElementById('iftarTime').textContent = ramzanDay.iftar;
                }
            } else {
                // Show current day's times
                document.getElementById('currentDay').textContent = `${ramzanDay.ramzanDay} (${dayOfMonth} March 2025)`;
                document.getElementById('sehriTime').textContent = ramzanDay.sehri;
                document.getElementById('iftarTime').textContent = ramzanDay.iftar;
            }
        } else {
            document.getElementById('currentDay').textContent = 'Outside Ramzan';
            document.getElementById('sehriTime').textContent = '-';
            document.getElementById('iftarTime').textContent = '-';
        }
    } else {
        document.getElementById('currentDay').textContent = 'Outside Ramzan';
        document.getElementById('sehriTime').textContent = '-';
        document.getElementById('iftarTime').textContent = '-';
    }
}

// Initialize the page
updateTimes();
populateCalendarTable();

// Update times every minute
setInterval(updateTimes, 60000);

// Eid al-Fitr countdown
function updateEidCountdown() {
    // Eid al-Fitr 2025 date (April 1, 2025)
    const eidDate = new Date('April 1, 2025 00:00:00').getTime();
    const now = new Date().getTime();
    const distance = eidDate - now;
    
    // If Eid has arrived
    if (distance < 0) {
        document.getElementById('eidCountdown').innerHTML = `
            <div class="eid-celebration">
                <div class="eid-title">Eid Mubarak!</div>
                <div class="eid-message">May Allah accept your prayers and sacrifices</div>
                <div class="eid-decoration">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-moon"></i>
                    <i class="fas fa-star"></i>
                </div>
            </div>
        `;
        return;
    }
    
    // Time calculations
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    // Display the result
    document.getElementById('days').textContent = days.toString().padStart(2, '0');
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
}

// Update the countdown every second
setInterval(updateEidCountdown, 1000);
updateEidCountdown(); // Initial call 

document.addEventListener('DOMContentLoaded', function() {
    const copyLinkBtn = document.getElementById('copyLinkBtn');
    const copyMessage = document.getElementById('copyMessage');
    
    if (copyLinkBtn && copyMessage) {
        copyLinkBtn.addEventListener('click', function() {
            const url = 'https://bit.ly/ramzan2025';
            
            if (navigator.clipboard) {
                navigator.clipboard.writeText(url)
                    .then(function() {
                        showCopyMessage();
                    })
                    .catch(function() {
                        fallbackCopy(url);
                    });
            } else {
                fallbackCopy(url);
            }
        });
        
        function fallbackCopy(text) {
            const textArea = document.createElement('textarea');
            textArea.value = text;
            textArea.style.position = 'fixed';
            textArea.style.left = '-999999px';
            textArea.style.top = '-999999px';
            document.body.appendChild(textArea);
            
            textArea.focus();
            textArea.select();
            
            try {
                document.execCommand('copy');
                showCopyMessage();
            } catch (err) {
                console.error('Failed to copy: ', err);
                alert('Copy link: ' + text);
            }
            
            document.body.removeChild(textArea);
        }
        
        function showCopyMessage() {
            copyMessage.classList.add('visible');
            setTimeout(function() {
                copyMessage.classList.remove('visible');
            }, 2000);
        }
    }
});

// Add this to your script.js file to fetch real temperature data
// Function to fetch weather data
function fetchWeatherData() {
    // Coordinates for Bhiwandi, Maharashtra
    const lat = 19.2813;
    const lon = 73.0483;
    
    // Using OpenWeatherMap API (you would need to replace 'YOUR_API_KEY' with an actual API key)
    // For demo purposes, we'll just set a random temperature
    
    // Simulate API call with random temperature between 28-36°C (typical for Maharashtra)
    const randomTemp = Math.floor(Math.random() * (36 - 28 + 1)) + 28;
    document.getElementById('currentTemp').textContent = `${randomTemp}°C`;
    
    // If you want to use a real API, uncomment this code and add your API key
    /*
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=YOUR_API_KEY`)
        .then(response => response.json())
        .then(data => {
            const temp = Math.round(data.main.temp);
            document.getElementById('currentTemp').textContent = `${temp}°C`;
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            // Fallback to random temperature
            const randomTemp = Math.floor(Math.random() * (36 - 28 + 1)) + 28;
            document.getElementById('currentTemp').textContent = `${randomTemp}°C`;
        });
    */
}

// Call the function when the page loads
fetchWeatherData();

// Add this function to calculate and update the countdowns
function updateCountdowns() {
    const now = new Date();
    
    // Get the time elements
    const sehriTimeElement = document.getElementById('sehriTime');
    const iftarTimeElement = document.getElementById('iftarTime');
    const sehriCountdownElement = document.getElementById('sehriCountdown');
    const iftarCountdownElement = document.getElementById('iftarCountdown');
    
    // Get time strings
    const sehriTimeStr = sehriTimeElement.textContent;
    const iftarTimeStr = iftarTimeElement.textContent;
    
    if (sehriTimeStr && iftarTimeStr && sehriTimeStr !== '-' && iftarTimeStr !== '-') {
        // Parse times
        const [sehriHour, sehriMinute] = sehriTimeStr.split(':').map(num => parseInt(num));
        const [iftarHour, iftarMinute] = iftarTimeStr.split(':').map(num => parseInt(num));
        
        // Convert to 24-hour format (assuming sehri is AM and iftar is PM)
        let sehriHour24 = sehriHour;
        let iftarHour24 = iftarHour < 12 ? iftarHour + 12 : iftarHour;
        
        // Create Date objects for today's times
        const sehriTime = new Date();
        sehriTime.setHours(sehriHour24, sehriMinute, 0, 0);
        
        const iftarTime = new Date();
        iftarTime.setHours(iftarHour24, iftarMinute, 0, 0);
        
        // If sehri time has passed for today, set it for tomorrow
        if (now > sehriTime) {
            sehriTime.setDate(sehriTime.getDate() + 1);
        }
        
        // If iftar time has passed for today, set it for tomorrow
        if (now > iftarTime) {
            iftarTime.setDate(iftarTime.getDate() + 1);
        }
        
        // Calculate time differences in milliseconds
        const msToSehri = sehriTime - now;
        const msToIftar = iftarTime - now;
        
        // Convert to hours, minutes, seconds
        if (msToSehri > 0) {
            const hoursToSehri = Math.floor(msToSehri / (1000 * 60 * 60));
            const minutesToSehri = Math.floor((msToSehri % (1000 * 60 * 60)) / (1000 * 60));
            const secondsToSehri = Math.floor((msToSehri % (1000 * 60)) / 1000);
            
            // Format with leading zeros
            const sehriCountdownStr = `${String(hoursToSehri).padStart(2, '0')}:${String(minutesToSehri).padStart(2, '0')}:${String(secondsToSehri).padStart(2, '0')}`;
            sehriCountdownElement.textContent = sehriCountdownStr;
            
            // Add urgent class if less than 1 hour remains
            if (hoursToSehri === 0) {
                sehriCountdownElement.classList.add('urgent');
            } else {
                sehriCountdownElement.classList.remove('urgent');
            }
        } else {
            sehriCountdownElement.textContent = "00:00:00";
            sehriCountdownElement.classList.add('urgent');
        }
        
        if (msToIftar > 0) {
            const hoursToIftar = Math.floor(msToIftar / (1000 * 60 * 60));
            const minutesToIftar = Math.floor((msToIftar % (1000 * 60 * 60)) / (1000 * 60));
            const secondsToIftar = Math.floor((msToIftar % (1000 * 60)) / 1000);
            
            // Format with leading zeros
            const iftarCountdownStr = `${String(hoursToIftar).padStart(2, '0')}:${String(minutesToIftar).padStart(2, '0')}:${String(secondsToIftar).padStart(2, '0')}`;
            iftarCountdownElement.textContent = iftarCountdownStr;
            
            // Add urgent class if less than 1 hour remains
            if (hoursToIftar === 0) {
                iftarCountdownElement.classList.add('urgent');
            } else {
                iftarCountdownElement.classList.remove('urgent');
            }
        } else {
            iftarCountdownElement.textContent = "00:00:00";
            iftarCountdownElement.classList.add('urgent');
        }
    }
}

// Call the function immediately and then every second
updateCountdowns();
setInterval(updateCountdowns, 1000); 