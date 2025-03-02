let reviews = [
  "Mendora changed my life. It listens and supports like a true companion. - User A",
  "I feel heard and understood, even in my toughest times. - User B",
  "The AI responses feel so human and comforting. - User C",
];
let index = 0;

function nextReview() {
  index = (index + 1) % reviews.length;
  document.getElementById(
    "carousel"
  ).innerHTML = `<p class="text-xl italic">${reviews[index]}</p>`;
}
