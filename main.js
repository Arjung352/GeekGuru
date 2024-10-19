document.addEventListener("DOMContentLoaded", () => {
  const facultyContainer = document.getElementById("faculty-container");
  const bookedContainer = document.getElementById("booked-container"); // For booked section

  // Determine if we are on the faculty booking page
  const isBookingPage = window.location.href.includes("booking");

  // Load faculty data and display profiles
  if (facultyContainer && facultyData) {
    displayFacultyProfiles(facultyContainer, facultyData, isBookingPage);
  }
});
function toggleMenu() {
  const navLinks = document.getElementById("navLinks");
  const menuToggle = document.querySelector(".menu-toggle");

  // Toggle the 'show' class for nav links
  navLinks.classList.toggle("show");

  // Change the button text to 'X' when menu is open, otherwise to '≡' (or any other symbol)
  if (navLinks.classList.contains("show")) {
    menuToggle.innerHTML = "X"; // Menu is open, change button text to 'X'
  } else {
    menuToggle.innerHTML = "&#9776;"; // Menu is closed, change button text to '≡' (Hamburger icon)
  }
}

// Function to display faculty profiles, conditionally adding select and button on booking page
function displayFacultyProfiles(container, data, isBookingPage = false) {
  data.forEach((faculty) => {
    const card = createFacultyCard(faculty, isBookingPage);
    container.appendChild(card);
  });
}

function createFacultyCard(faculty, isBookingPage) {
  const card = document.createElement("div");
  card.className = "faculty-card";

  const img = document.createElement("img");
  img.src = faculty.photo;
  img.alt = `${faculty.name} photo`;

  const content = document.createElement("div");
  content.className = "faculty-card-content";

  const name = document.createElement("h2");
  name.textContent = faculty.name;

  const qualification = document.createElement("p");
  qualification.textContent = `Qualification: ${faculty.qualification}`;

  const phone = document.createElement("p");
  phone.textContent = `Phone: ${faculty.phone}`;

  const email = document.createElement("p");
  email.textContent = `Email: ${faculty.email}`;

  // Append elements to content
  content.appendChild(name);
  content.appendChild(qualification);
  content.appendChild(phone);
  content.appendChild(email);

  // Conditionally add the select element and book button if on booking page
  if (isBookingPage) {
    const timeSlotSelect = document.createElement("select");
    timeSlotSelect.id = `time-select-${faculty.name}`; // Unique ID for time slot select

    const timeSlot = ["9:00-11:00", "12:00-2:00", "3:00-5:00", "6:00-8:00"];
    timeSlot.forEach((slot) => {
      const option = document.createElement("option");
      option.value = slot;
      option.textContent = slot;
      timeSlotSelect.appendChild(option);
    });

    // Add the select element
    content.appendChild(timeSlotSelect);

    // Create the "Book Now" button
    const bookBtn = document.createElement("button");
    bookBtn.textContent = "Book Now";
    bookBtn.className = "book-btn";
    bookBtn.addEventListener("click", () =>
      handleBooking(faculty, bookBtn, timeSlotSelect, card)
    );

    // Add the book button
    content.appendChild(bookBtn);
  }

  card.appendChild(img);
  card.appendChild(content);

  return card;
}

// Handle booking process
function handleBooking(faculty, button, timeSelect, card) {
  const selectedTime = timeSelect.value;

  if (selectedTime) {
    // Change button text to "Booked"
    button.textContent = "Booked";
    button.disabled = true; // Disable the button after booking

    // Move the faculty card to the booked section
    const bookedContainer = document.getElementById("booked-container");
    if (bookedContainer) {
      bookedContainer.appendChild(card);
    }

    alert(`Appointment booked with ${faculty.name} at ${selectedTime}`);
  } else {
    alert("Please select a time slot to book an appointment.");
  }
}
