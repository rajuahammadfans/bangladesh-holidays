var holidayContent = document.querySelector(".table-body-content");

// Create Node Element
function createElem(tag) {
    return document.createElement(tag);
}

// Append Element
function appendElem(parent, elem) {
    return parent.appendChild(elem);
}


// API Info
var BASE = "https://calendarific.com/api/v2/holidays?",
    KEY = "f9fb2d2998ab84513a40dead58b9f071a645530c";

function bdHolidays() {
    fetch(`${BASE}api_key=${KEY}&country=BD&year=2018`)
        .then(response => response.json())
        .then(data => {
            var holidaysList = data.response.holidays;

            holidaysList.forEach((elem, index) => {
                let tr = createElem('tr'),
                    holidaySL = createElem("td"),
                    holidayTitle = createElem("td"),
                    holidayDate = createElem('td'),
                    holidayType = createElem('td');
                tr.className = 'holiday-item';
                holidaySL.className = 'holiday-no';
                holidayTitle.className = 'holiday-title';
                holidayDate.className = 'holiday-date';
                holidayType.className = 'holiday-type';
                holidaySL.innerHTML = index + 1;
                holidayTitle.innerHTML = elem.name;
                holidayDate.innerHTML = `${elem.date.datetime.day}-${elem.date.datetime.month}-${elem.date.datetime.year}`;
                holidayType.innerHTML = elem.type;

                appendElem(tr, holidaySL);
                appendElem(tr, holidayTitle);
                appendElem(tr, holidayDate);
                appendElem(tr, holidayType);
                appendElem(holidayContent, tr);
            });
        })
}

bdHolidays();