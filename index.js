var holidayContent = document.querySelector(".table-body-content"),
    heading = document.querySelector(".main-title");

// Create Node Element
function createElem(tag) {
    return document.createElement(tag);
}

// Append Element
function appendElem(parent, elem) {
    return parent.appendChild(elem);
}

// Additional Variable
var d = new Date(),
    Days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    Months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

heading.innerHTML = `Bangladesh Holidays in ${d.getFullYear()}`;

// API Info
var BASE = "https://calendarific.com/api/v2/holidays?",
    KEY = "f9fb2d2998ab84513a40dead58b9f071a645530c";

function bdHolidays() {
    fetch(`${BASE}api_key=${KEY}&country=BD&year=${d.getFullYear()}`)
        .then(response => response.json())
        .then(data => {
            var holidaysList = data.response.holidays;

            holidaysList.forEach((elem, index) => {
                // Create Elements
                let tr = createElem('tr'),
                    holidayTitle = createElem("td"),
                    holidayDate = createElem('td'),
                    holidayDay = createElem('td'),
                    holidayDesc = createElem('span');

                // Add Class Name 
                tr.className = 'holiday-item';
                holidayTitle.className = 'holiday-title';
                holidayDesc.className = 'holiday-desc';
                holidayDay.className = 'holiday-weekday';
                holidayDate.className = 'holiday-date';

                // Insert Data On HTML
                holidayTitle.innerHTML = elem.name;
                holidayDesc.innerHTML = elem.description;
                d = new Date(`${elem.date.datetime.year}-${elem.date.datetime.month}-${elem.date.datetime.day}`);
                holidayDay.innerHTML = Days[d.getDay()];
                holidayDate.innerHTML = `${Months[d.getMonth()]} ${elem.date.datetime.day}`;

                // Append Element
                appendElem(tr, holidayTitle);
                appendElem(holidayTitle, holidayDesc);
                appendElem(tr, holidayDay);
                appendElem(tr, holidayDate);
                appendElem(holidayContent, tr);
            });
        })
}

bdHolidays();