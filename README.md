# AI To-Do Planner

A responsive task planner that uses the OpenAI API to transform goals into structured, manageable tasks. Tasks persist locally in the browser; the API key remains exclusively on the server.

## Run locally

1. Install Node.js 18 or newer.
2. In this folder, run `npm install`.
3. Copy `.env.example` to `.env` and set `OPENAI_API_KEY` to your API key. Do not commit this file.
4. Run `npm start`, then open `http://localhost:3000`.

`OPENAI_MODEL` is optional and defaults to `gpt-5.6`. The backend uses the OpenAI Responses API with strict JSON-schema output and validates responses again before returning them.

## Project layout

- `frontend/` — responsive dashboard and client-side task persistence
- `backend/routes/ai.js` — validated, error-safe API endpoint
- `services/aiService.js` — replaceable OpenAI integration and prompt/schema
