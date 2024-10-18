const mentors = [
  {
    name: "Dr. Ramesh Kumar",
    expertise: "Data Structures, Algorithms",
    availableSlots: ["10:00 AM", "2:00 PM", "4:00 PM"],
  },
  {
    name: "Dr. Meena Gupta",
    expertise: "Machine Learning, Artificial Intelligence",
    availableSlots: ["11:00 AM", "3:00 PM"],
  },
];

const bookedSlots = []; // To track booked slots

function displayMentors() {
  const mentorList = document.getElementById("mentor-list");

  mentors.forEach((mentor) => {
    const mentorDiv = document.createElement("div");
    mentorDiv.classList.add("mentor");

    mentorDiv.innerHTML = `
        <h3>${mentor.name}</h3>
        <p><strong>Expertise:</strong> ${mentor.expertise}</p>
      `;

    mentorList.appendChild(mentorDiv);
  });
}

function displaySlots() {
  const availableSlots = document.getElementById("available-slots");
  availableSlots.innerHTML = ""; // Clear previous slots

  mentors.forEach((mentor, mentorIndex) => {
    mentor.availableSlots.forEach((slot) => {
      const li = document.createElement("li");
      li.classList.add("available");
      li.innerText = `${mentor.name} - ${slot}`;

      if (bookedSlots.includes(`${mentorIndex}-${slot}`)) {
        li.classList.add("booked");
        li.classList.remove("available");
        li.innerText += " (Booked)";
      }

      li.addEventListener("click", () => {
        if (!li.classList.contains("booked")) {
          bookedSlots.push(`${mentorIndex}-${slot}`);
          sendNotification(mentor.name, slot);
          displaySlots(); // Update the slots
        }
      });

      availableSlots.appendChild(li);
    });
  });
}

function sendNotification(mentorName, slot) {
  const notification = document.getElementById("notification");
  notification.innerText = `You have successfully booked a session with ${mentorName} at ${slot}.`;
}

window.onload = () => {
  displayMentors();
  displaySlots();
};
