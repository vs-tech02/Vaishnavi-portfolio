const $ = (selector) => document.querySelector(selector);
$("#year").textContent = new Date().getFullYear();
$("#themeToggle").addEventListener("click", () => {
  document.body.classList.toggle("light");
  const light = document.body.classList.contains("light");
  $("#themeToggle").setAttribute("aria-pressed", String(light));
});
function filterProjects() {
  const query = $("#projectSearch").value.trim().toLowerCase();
  const category = $("#categoryFilter").value;
  let visible = 0;
  document.querySelectorAll(".project-card").forEach((card) => {
    const matchesText = card.textContent.toLowerCase().includes(query);
    const matchesCategory = category === "all" || card.dataset.category === category;
    card.hidden = !(matchesText && matchesCategory);
    if (!card.hidden) visible++;
  });
  $("#emptyState").hidden = visible > 0;
}
$("#projectSearch").addEventListener("input", filterProjects);
$("#categoryFilter").addEventListener("change", filterProjects);
const fallbackAnswer = (question) => {
  const q = question.toLowerCase();
  if (q.includes("skill") || q.includes("technology") || q.includes("tech")) return "The portfolio highlights Python, HTML, CSS, JavaScript, debugging, Cursor AI, Git, and GitHub.";
  if (q.includes("python") || q.includes("basic")) return "Python Basic Programs is a collection of beginner-friendly exercises. Open the first project card to visit its GitHub repository.";
  if (q.includes("messy") || q.includes("refactor") || q.includes("clean")) return "Messy Python Code Improvement focuses on readability, refactoring, and maintainable code.";
  if (q.includes("bug") || q.includes("cursor") || q.includes("debug")) return "Bug Fixing with Cursor AI explores debugging workflows with an AI coding assistant.";
  if (q.includes("quiz")) return "Interactive Quiz Collection is the quiz and interactive-learning project.";
  if (q.includes("book") || q.includes("reading")) return "Book Reading List is a project for organizing a personal reading list.";
  if (q.includes("contact") || q.includes("email")) return "You can use the GitHub profile link or the email link in the Contact section. Update the placeholder email before publishing.";
  return "I can answer questions about the five projects, skills, or contact links. Which would you like to know about?";
};
$("#chatForm").addEventListener("submit", async (event) => {
  event.preventDefault();
  const input = $("#chatInput");
  const question = input.value.trim();
  if (!question) return;
  appendMessage(question, "user");
  input.value = "";
  const loading = appendMessage("Thinking…", "bot");
  try {
    const response = await fetch("/api/chat", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: question })
    });
    if (!response.ok) throw new Error("Chat API unavailable");
    const data = await response.json();
    loading.textContent = data.reply || fallbackAnswer(question);
  } catch {
    loading.textContent = fallbackAnswer(question);
  }
});
function appendMessage(text, role) {
  const message = document.createElement("p");
  message.className = "chat-message " + role;
  message.textContent = text;
  $("#chatLog").appendChild(message);
  $("#chatLog").scrollTop = $("#chatLog").scrollHeight;
  return message;
}