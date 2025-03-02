document.addEventListener("DOMContentLoaded", function () {
  // Get user information
  const username = localStorage.getItem("currentUser") || "User";
  const avatarElement = document.getElementById("user-avatar");
  avatarElement.textContent = username.charAt(0).toUpperCase();

  // Toggle between exercises and foods
  const exercisesBtn = document.getElementById("exercises-btn");
  const foodsBtn = document.getElementById("foods-btn");
  const exercisesSection = document.getElementById("exercises-section");
  const foodsSection = document.getElementById("foods-section");

  exercisesBtn.addEventListener("click", function () {
    exercisesBtn.classList.add("active");
    foodsBtn.classList.remove("active");
    exercisesSection.classList.add("active");
    foodsSection.classList.remove("active");
  });

  foodsBtn.addEventListener("click", function () {
    foodsBtn.classList.add("active");
    exercisesBtn.classList.remove("active");
    foodsSection.classList.add("active");
    exercisesSection.classList.remove("active");
  });
});
