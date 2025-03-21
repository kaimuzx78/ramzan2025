const ramadanData = [
    { ramadanDay: "16", date: "17", sehri: "5:22", iftar: "6:51" },
    { ramadanDay: "17", date: "18", sehri: "5:21", iftar: "6:51" },
    { ramadanDay: "18", date: "19", sehri: "5:20", iftar: "6:51" },
    { ramadanDay: "19", date: "20", sehri: "5:19", iftar: "6:52" },
    { ramadanDay: "20", date: "21", sehri: "5:19", iftar: "6:52" },
    { ramadanDay: "21", date: "22", sehri: "5:18", iftar: "6:52" },
    { ramadanDay: "22", date: "23", sehri: "5:18", iftar: "6:52" },
    { ramadanDay: "23", date: "24", sehri: "5:17", iftar: "6:53" },
    { ramadanDay: "24", date: "25", sehri: "5:16", iftar: "6:53" },
    { ramadanDay: "25", date: "26", sehri: "5:15", iftar: "6:53" },
    { ramadanDay: "26", date: "27", sehri: "5:14", iftar: "6:54" },
    { ramadanDay: "27", date: "28", sehri: "5:13", iftar: "6:54" },
    { ramadanDay: "28", date: "29", sehri: "5:12", iftar: "6:54" },
    { ramadanDay: "29", date: "30", sehri: "5:11", iftar: "6:55" },
    { ramadanDay: "30", date: "31", sehri: "5:10", iftar: "6:55" }
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
    
    ramadanData.forEach((day, index) => {
        const row = document.createElement('tr');
        if (parseInt(day.date) === currentDate && 
            today.getMonth() === 2 && 
            today.getFullYear() === 2025) {
            row.classList.add('current-row');
        }
        
        const isLastDay = index === ramadanData.length - 1;
        row.innerHTML = `
            <td>${day.ramadanDay}</td>
            <td>${day.date} Mar</td>
            <td>${day.sehri}</td>
            <td>${day.iftar}</td>
        `;
        tableBody.appendChild(row);
    });
}

function updateTimes() {
    const today = new Date();
    const march2025 = today.getMonth() === 2 && today.getFullYear() === 2025;
    
    if (march2025) {
        const dayOfMonth = today.getDate();
        const ramadanDay = ramadanData.find(day => parseInt(day.date) === dayOfMonth);
        
        if (ramadanDay) {
            document.getElementById('currentDay').textContent = `${ramadanDay.ramadanDay} (${dayOfMonth} March 2025)`;
            document.getElementById('sehriTime').textContent = ramadanDay.sehri;
            document.getElementById('iftarTime').textContent = ramadanDay.iftar;
        } else {
            document.getElementById('currentDay').textContent = 'Outside Ramadan';
            document.getElementById('sehriTime').textContent = '-';
            document.getElementById('iftarTime').textContent = '-';
        }
    } else {
        document.getElementById('currentDay').textContent = 'Outside Ramadan';
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