# Vaishnavi — Developer Portfolio

Responsive personal portfolio featuring five GitHub projects, project search/filter, a light/dark theme toggle, and a portfolio chatbot with a built-in fallback.

## Projects

- [Python Basic Programs](https://github.com/vs-tech02/Python_basic-programs)
- [Messy Python Code Improvement](https://github.com/vs-tech02/messy-python-code-improvement)
- [Bug Fixing with Cursor AI](https://github.com/vs-tech02/bug-fixing-cursor-ai)
- [Interactive Quiz Collection](https://github.com/vs-tech02/interactive-quiz-collection)
- [Book Reading List](https://github.com/vs-tech02/book-reading-list)

## Run locally

Open `index.html` in a browser to preview the static portfolio and fallback chatbot. The API-backed chatbot requires deployment on Vercel.

## Deploy on Vercel

1. Import this GitHub repository into [Vercel](https://vercel.com/).
2. Keep the default project settings and deploy.
3. Optional: in Vercel **Settings → Environment Variables**, add `OPENAI_API_KEY` and optionally `OPENAI_MODEL` (default `gpt-4o-mini`). Redeploy after adding variables.
4. Replace the placeholder email `vaishnavi@example.com` in `index.html` with your real contact email before submitting.

Never put API keys in browser-side JavaScript or commit them to GitHub. If no API key is configured, the chatbot's built-in fallback still responds to common portfolio questions.
