MiniMind
=========
An interactive, hands-on playground that introduces core AI concepts (chatbots, computer vision, classification) through playful experiences: animated onboarding, a spin-the-wheel activity selector, a webcam gesture game, a CV quiz, and an AI chat assistant powered by a Gemini-backed Flask API.

Features
--------
- Immersive onboarding flow (`WelcomePage`, `Introduction`, `Discovery`) with motion-heavy visuals.
- AI Wheel hub (`WheelPage`) to jump into experiences.
- Gesture Game (`GestureGame` + `HandGame`) using TensorFlow Handpose + Fingerpose to detect finger counts via webcam.
- Computer Vision quiz (`QuizCv`) with animated progress, scoring, and feedback.
- Chat experience (`ChatPage`) that talks to a Flask backend using Gemini (`google-genai`) with per-session history.
- Shared neural background, dive animation, and shadcn/radix UI components for consistent styling.

Tech Stack
----------
- Frontend: React 18, TypeScript, Vite, TailwindCSS + shadcn/radix UI, Framer Motion, React Router, TanStack Query.
- CV & interactivity: @tensorflow-models/handpose, @tensorflow/tfjs, fingerpose.
- Backend: Flask + `google-genai` for Gemini responses, CORS enabled.

Project Structure
-----------------
- `src/` frontend app
  - `pages/` experience pages (`WelcomePage`, `Introduction`, `Discovery`, `WheelPage`, `GestureGame`, `QuizCv`, `ChatPage`, `Blank`, `AgentWelcome`)
  - `components/` shared UI (neural background, dive animation, AI wheel, quiz cards, shadcn UI primitives)
  - `hooks/`, `lib/` utilities
- `backend/app.py` Flask API for chat (Gemini)
- `public/` static assets

Getting Started
---------------
Prerequisites: Node 18+, npm (or bun), Python 3.10+, pip, a Gemini API key.

1) Install frontend deps
```
npm install
```

2) Run the frontend
```
npm run dev
```
The dev server runs via Vite (defaults to http://localhost:5173).

3) Set up and run the backend
```
cd backend
python -m venv .venv
.venv\Scripts\activate        # PowerShell: .\.venv\Scripts\Activate.ps1
pip install flask google-genai
$env:GEMINI_API_KEY="your-key-here"   # set your Gemini key
python app.py                         # serves http://127.0.0.1:5000
```
Make sure the backend URL matches the frontend `ChatPage` target (`http://127.0.0.1:5000/api/chat`).

Available Scripts (frontend)
----------------------------
- `npm run dev` — start Vite dev server
- `npm run build` — production build
- `npm run preview` — preview the production build
- `npm run lint` — run eslint

Key User Flows
--------------
- Landing → `WelcomePage` (click to dive) → `Introduction`/`Discovery`
- Spin wheel on `WheelPage` to choose activities
- `GestureGame` to try webcam-based finger counting
- `QuizCv` for CV fundamentals
- `AgentWelcome` → `ChatPage` to chat with Gemini via Flask backend
- `Blank` is a placeholder route

Demo Video
----------
Click the thumbnail below to watch the demo:

[![Watch the demo](https://img.youtube.com/vi/SuHxureevws/0.jpg)](https://www.youtube.com/watch?v=SuHxureevws)

Notes
-----
- The Flask app requires `GEMINI_API_KEY`; without it, startup will fail.
- Keep secrets out of version control; use environment variables.
- If the chat shows a connection error, confirm the backend is running and reachable.

Demo Video
----------
- Placeholder: add demo link or embed once available.

Contributing
------------
1) Create a feature branch  
2) Run `npm run lint` before PRs  
3) Add concise docs/notes for UI or API changes
