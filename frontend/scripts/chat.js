async function sendMessage() {
  let userInput = document.getElementById("userInput").value.trim();
  if (!userInput) return;

  // Add user message
  appendMessage("You", userInput, "user-message");

  // Clear input
  document.getElementById("userInput").value = "";

  // Show typing indicator
  const typingIndicator = document.getElementById("typingIndicator");
  typingIndicator.style.display = "block";

  try {
  const response = await fetch("/chat", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ message: userInput }),
});

    const data = await response.json();

    // Hide typing indicator
    setTimeout(() => {
      typingIndicator.style.display = "none";

      // Process the response text to fix formatting
      let formattedResponse = data.reply;

      // Replace asterisks with proper bold tags
      formattedResponse = formattedResponse.replace(
        /\*\*(.*?)\*\*/g,
        "<strong>$1</strong>"
      );
      formattedResponse = formattedResponse.replace(
        /\*(.*?)\*/g,
        "<strong>$1</strong>"
      );

      // Add AI message
      appendMessage("Mendora", formattedResponse, "ai-message");
    }, 800); // Delay for typing effect
  } catch (error) {
    typingIndicator.style.display = "none";
    appendMessage(
      "Mendora",
      "Sorry, I couldn't connect to the server.",
      "ai-message"
    );
    console.error("Chatbot Error:", error);
  }
}

function appendMessage(sender, content, className) {
  let chatbox = document.getElementById("chatbox");

  const messageDiv = document.createElement("div");
  messageDiv.className = `message ${className}`;

  const senderDiv = document.createElement("div");
  senderDiv.className = "message-sender";
  senderDiv.textContent = sender;

  const contentDiv = document.createElement("div");
  contentDiv.className = "message-content";
  contentDiv.innerHTML = content;

  messageDiv.appendChild(senderDiv);
  messageDiv.appendChild(contentDiv);

  // Insert before typing indicator
  const typingIndicator = document.getElementById("typingIndicator");
  chatbox.insertBefore(messageDiv, typingIndicator);

  // Scroll to bottom
  chatbox.scrollTop = chatbox.scrollHeight;
}

// Focus input on page load
window.onload = function () {
  document.getElementById("userInput").focus();
};
