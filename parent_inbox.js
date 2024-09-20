// script.js

// Sample messages data
const messages = {
  1: {
    sender: "Admin",
    date: "Today",
    subject: "Welcome to your dashboard!",
    content:
      "Hello Parent,\n\nWelcome to your dashboard. Here you can manage your profile, view case history, and access other features.\n\nBest regards,\nAdmin Team",
    attachments: [
      { name: "Welcome.pdf", url: "#" },
      { name: "Getting_Started.pdf", url: "#" },
    ],
  },
  2: {
    sender: "Admin",
    date: "Yesterday",
    subject: "Attached Documents",
    content:
      "Dear Parent,\n\nPlease find the attached documents for your review.\n\nRegards,\nAdmin Team",
    attachments: [{ name: "Documents.zip", url: "#" }],
  },
  // Add more messages as needed
};

// Function to display message details
function displayMessage(id) {
  const message = messages[id];
  const messageDetails = document.getElementById("messageDetails");

  if (message) {
    let attachmentsHTML = "";
    if (message.attachments.length > 0) {
      attachmentsHTML = "<h6>Attachments:</h6><ul>";
      message.attachments.forEach((att) => {
        attachmentsHTML += `<li><a href="${att.url}" download>${att.name}</a></li>`;
      });
      attachmentsHTML += "</ul>";
    } else {
      attachmentsHTML = "<p>No attachments.</p>";
    }

    messageDetails.innerHTML = `
            <h5>${message.subject}</h5>
            <p><strong>From:</strong> ${message.sender}</p>
            <p><strong>Date:</strong> ${message.date}</p>
            <hr>
            <p>${message.content.replace(/\n/g, "<br>")}</p>
            ${attachmentsHTML}
        `;
  } else {
    messageDetails.innerHTML = `<p>Message not found.</p>`;
  }
}

// Add event listeners to message list items
document.addEventListener("DOMContentLoaded", () => {
  const messageItems = document.querySelectorAll(
    "#messageList .list-group-item"
  );
  messageItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      // Remove active class from all items
      messageItems.forEach((i) => i.classList.remove("active"));
      // Add active class to the clicked item
      item.classList.add("active");
      // Get message ID and display details
      const messageId = item.getAttribute("data-message-id");
      displayMessage(messageId);
    });
  });
});
