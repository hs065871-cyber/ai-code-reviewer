# AI Code Reviewer

An AI-powered code review application that analyzes JavaScript code and provides useful feedback using Google Gemini API.

## 🚀 Live Demo

Frontend: Add your Render frontend link here

## ✨ Features

- Write and edit JavaScript code
- AI-powered code review
- Detect bugs and errors
- Code quality suggestions
- Improved/corrected code
- Developer tips
- Syntax highlighting
- Responsive UI

## 🛠️ Tech Stack

### Frontend
- React.js
- Vite
- Axios
- Prism.js
- React Markdown

### Backend
- Node.js
- Express.js
- Google Gemini API
- CORS

## 📁 Project Structure

```text
ai-code-reviewer/
│
├── Backend/
│   ├── src/
│   │   ├── controller/
│   │   ├── routes/
│   │   ├── services/
│   │   └── app.js
│   ├── server.js
│   └── package.json
│
├── Frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
└── .gitignore
