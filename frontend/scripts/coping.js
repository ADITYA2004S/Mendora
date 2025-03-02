// Get DOM elements
const sidebar = document.getElementById("sidebar");
const mainContent = document.getElementById("main-content");
const sidebarToggle = document.getElementById("sidebar-toggle");
const toggleIcon = document.getElementById("toggle-icon");
const mobileToggle = document.getElementById("mobile-toggle");
const pageButtons = document.querySelectorAll(".strategy-btn");
const pages = document.querySelectorAll(".page-content");
const currentPageIndicator = document.getElementById("current-page-indicator");
const bookButtons = document.querySelectorAll(".book-btn");
const modal = document.getElementById("booking-modal");
const closeModal = document.querySelector(".close-modal");
const expertNameSpan = document.getElementById("expert-name");
const currentDateEl = document.getElementById("current-date");
const saveJournalBtn = document.getElementById("save-journal");
const vanishBtn = document.getElementById("vanish-btn");
const journalTextarea = document.getElementById("journal-text");

// Set current date
if (currentDateEl) {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  currentDateEl.textContent = new Date().toLocaleDateString("en-US", options);
}

// Journal functionality
if (saveJournalBtn) {
  saveJournalBtn.addEventListener("click", () => {
    if (journalTextarea.value.trim() !== "") {
      // In a real app, save the journal entry to a database
      alert("Journal entry saved successfully!");
      journalTextarea.value = ""; // Clear the textarea
    } else {
      alert("Please write something before saving.");
    }
  });
}

if (vanishBtn) {
  vanishBtn.addEventListener("click", () => {
    journalTextarea.value = ""; // Clear the textarea
  });
}

// Toggle sidebar
sidebarToggle.addEventListener("click", () => {
  sidebar.classList.toggle("collapsed");
  mainContent.classList.toggle("expanded");

  // Change toggle icon
  toggleIcon.textContent = sidebar.classList.contains("collapsed") ? "▶" : "◀";
});

// Mobile toggle
mobileToggle.addEventListener("click", () => {
  sidebar.classList.toggle("active");
});

// Page navigation
pageButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Remove active class from all buttons
    pageButtons.forEach((btn) => btn.classList.remove("active"));

    // Add active class to clicked button
    button.classList.add("active");

    // Get page name from data attribute
    const pageName = button.getAttribute("data-page");

    // Update page indicator
    let pageTitle = button.querySelector("span").textContent;
    currentPageIndicator.textContent = pageTitle;

    // Hide all pages
    pages.forEach((page) => {
      page.style.display = "none";
    });

    // Show selected page
    document.getElementById(`${pageName}-page`).style.display = "block";
  });
});

// Expert booking
bookButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const expertName = button.getAttribute("data-expert");
    expertNameSpan.textContent = expertName;
    modal.style.display = "flex";
  });
});

// Close modal
closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

// Close modal when clicking outside of it
window.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});
