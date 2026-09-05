# 🚀 EmpAI — AI-Powered Employee Assistant Dashboard

A state-of-the-art, modern enterprise AI Assistant and HR Management Dashboard built with **React 18**, **Vite**, **Zustand**, **Framer Motion**, and **Google Gemini AI**. 

EmpAI provides employees and HR managers with an interactive AI assistant for instant policy answers, team member directory filtering, interactive workforce analytics, and customizable user profile settings—all wrapped in a sleek, glassmorphic dark interface.

---

## 📸 Core Features

- 🤖 **AI Assistant Chat**: Interactive AI chat powered by Google's latest **Gemini 3.6 Flash** model (`@google/generative-ai`), pre-configured with HR context, suggestion prompts, history persistence, and dynamic loading states.
- 👥 **Employee Directory**: Real-time searchable and filterable directory by department with employee detail cards, contact information, and role indicators.
- 📊 **Analytics Dashboard**: Interactive charts built with **Recharts** displaying key workforce metrics including total workforce, department distributions, and employment types.
- 🎨 **Modern UI/UX**: Premium dark-mode glassmorphism design system using CSS Modules, Framer Motion micro-animations, and GSAP smooth entry transitions.
- ⚙️ **Profile Settings**: Theme preferences, notification controls, and user details management.
- 🔐 **Secure API Integration**: Server-side & build-time environment variable support (`VITE_GEMINI_API_KEY`) so credentials remain hidden from end-users.

---

## 🛠️ Tech Stack & Dependencies

| Category | Technologies / Libraries |
|---|---|
| **Core Framework** | React 18, Vite 5, JavaScript (ESNext) |
| **Routing** | React Router DOM v6 |
| **State Management** | Zustand (with LocalStorage persistence) |
| **AI Integration** | `@google/generative-ai` (Gemini 3.6 Flash API) |
| **Animations** | Framer Motion, GSAP |
| **Data Visualization** | Recharts |
| **Icons & UI Feedback** | Lucide React, React Hot Toast |
| **Styling** | Vanilla CSS Modules, CSS Custom Properties (Design Tokens), Glassmorphism |

---

## 📁 Project Structure

```
assignment/
├── public/                # Static assets & favicons
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── common/        # Buttons, Cards, Badges, Modals
│   │   ├── directory/     # Employee Cards, Search & Filters
│   │   ├── layout/        # AppLayout, Sidebar, Navbar
│   │   └── ui/            # UI widgets
│   ├── data/              # Mock employee & analytics dataset
│   ├── pages/             # Page components
│   │   ├── Analytics.jsx  # Workforce analytics & charts
│   │   ├── Chat.jsx       # AI Chat assistant interface
│   │   ├── Directory.jsx  # Employee directory list & filters
│   │   ├── Landing.jsx    # Hero landing page
│   │   └── Profile.jsx    # Profile settings & preferences
│   ├── services/          # API integration layer
│   │   └── geminiService.js # Gemini AI client & prompt logic
│   ├── store/             # Global state (useAppStore.js)
│   ├── App.jsx            # Main app router setup
│   ├── index.css          # Global CSS tokens & resets
│   └── main.jsx           # React app entry point
├── .env                   # Environment variables (git-ignored)
├── API_INTEGRATION.md     # Detailed AI API Integration Guide
├── TECHNOLOGIES_USED.md   # Deep-dive into tech choices & design system
├── vercel.json            # Vercel deployment configuration
└── package.json           # Project metadata & dependencies
```

---

## ⚡ Quick Start (Local Setup)

### 1. Clone the repository
```bash
git clone https://github.com/nitinkumar68/EmpAI-Dashboard.git
cd EmpAI-Dashboard
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory:
```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```
> 💡 Obtain a Gemini API key from [Google AI Studio](https://aistudio.google.com/).

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📦 Build & Deployment

### Production Build
```bash
npm run build
```
The optimized bundle will be compiled into the `dist/` directory.

### Deploying to Vercel
1. Push your repository to GitHub.
2. Import the repo on [Vercel](https://vercel.com).
3. Under **Environment Variables**, add:
   - Key: `VITE_GEMINI_API_KEY`
   - Value: `your_gemini_api_key_value`
4. Deploy! The included `vercel.json` ensures SPA client-side routing works seamlessly.

---

## 📄 Extended Documentation

- 📖 [**API Integration Guide (`API_INTEGRATION.md`)**](file:///Users/apple/assignment/API_INTEGRATION.md): Complete architecture of the Gemini AI integration, model fallback strategy, system prompts, and security setup.
- 🛠️ [**Technologies & Architecture (`TECHNOLOGIES_USED.md`)**](file:///Users/apple/assignment/TECHNOLOGIES_USED.md): Detailed breakdown of UI components, CSS design tokens, state management flow, and data visualizations.

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.
