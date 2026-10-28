export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }
  const message = typeof req.body?.message === "string" ? req.body.message.trim() : "";
  if (!message || message.length > 500) {
    return res.status(400).json({ error: "Please provide a message up to 500 characters." });
  }
  if (!process.env.OPENAI_API_KEY) {
    return res.status(503).json({ error: "Chat API is not configured." });
  }
  try {
    const upstream = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-4o-mini",
        temperature: 0.4,
        max_tokens: 220,
        messages: [
          { role: "system", content: "You are Vaishnavi's portfolio assistant. Answer briefly and only using this information: projects are Python Basic Programs, Messy Python Code Improvement, Bug Fixing with Cursor AI, Interactive Quiz Collection, and Book Reading List. Skills listed are Python, HTML, CSS, JavaScript, debugging, Cursor AI, Git and GitHub. If asked for unsupported personal details, say you don't have that information." },
          { role: "user", content: message }
        ]
      })
    });
    if (!upstream.ok) return res.status(502).json({ error: "Chat provider returned an error." });
    const data = await upstream.json();
    const reply = data.choices?.[0]?.message?.content?.trim();
    if (!reply) return res.status(502).json({ error: "No response was returned." });
    return res.status(200).json({ reply });
  } catch {
    return res.status(500).json({ error: "Unable to reach the chat provider." });
  }
}