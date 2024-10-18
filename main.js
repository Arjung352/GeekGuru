document.addEventListener('DOMContentLoaded', () => {
    const facultyContainer = document.getElementById('faculty-container');
    const facultySelect = document.getElementById('faculty-select');
    
    // Load faculty data
    if (facultyContainer && facultyData) {
        displayFacultyProfiles(facultyContainer, facultyData);
    }

    if (facultySelect && facultyData) {
        populateFacultySelect(facultySelect, facultyData);
    }

    const bookNowBtn = document.getElementById('book-now');
    if (bookNowBtn) {
        bookNowBtn.addEventListener('click', handleBooking);
    }
});

// Display faculty profiles dynamically
function displayFacultyProfiles(container, data) {
    data.forEach(faculty => {
        const card = createFacultyCard(faculty);
        container.appendChild(card);
    });
}

function createFacultyCard(faculty) {
    const card = document.createElement('div');
    card.className = 'faculty-card';

    const img = document.createElement('img');
    img.src = faculty.photo;
    img.alt = `${faculty.name} photo`;

    const content = document.createElement('div');
    content.className = 'faculty-card-content';

    const name = document.createElement('h2');
    name.textContent = faculty.name;

    const qualification = document.createElement('p');
    qualification.textContent = `Qualification: ${faculty.qualification}`;

    const phone = document.createElement('p');
    phone.textContent = `Phone: ${faculty.phone}`;

    const email = document.createElement('p');
    email.textContent = `Email: ${faculty.email}`;

    content.appendChild(name);
    content.appendChild(qualification);
    content.appendChild(phone);
    content.appendChild(email);

    card.appendChild(img);
    card.appendChild(content);

    return card;
}

// Populate faculty select dropdown
function populateFacultySelect(selectElement, data) {
    data.forEach(faculty => {
        const option = document.createElement('option');
        option.value = faculty.name;
        option.textContent = faculty.name;
        selectElement.appendChild(option);
    });
}

// Handle booking
function handleBooking() {
    const faculty = document.getElementById('faculty-select').value;
    const date = document.getElementById('date-select').value;
    const time = document.getElementById('time-select').value;

    if (faculty && date && time) {
        alert(`Appointment booked with ${faculty} on ${date} at ${time}`);
    } else {
        alert('Please select all the fields to book an appointment.');
    }
}
