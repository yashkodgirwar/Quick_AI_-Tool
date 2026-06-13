# 🚀 Quick.ai - Advanced AI Content & Image Generation Platform

Quick.ai is a modern, premium full-stack AI SaaS application that empowers creators, writers, job seekers, and designers. It integrates state-of-the-art AI models, database management, user authentication, and advanced media processing to offer a suite of powerful generation and editing tools.

---

## 🌟 Key Features

### ✍️ AI Writing Suite
*   **AI Article Writer:** Generates detailed articles in variable lengths (800, 1200, or 1600 words) using Google's `gemini-2.5-flash` model.
*   **Blog Title Generator:** Creates catchy, SEO-friendly headlines for blogs across multiple categories using `gemini-2.5-flash`.

### 🎨 Advanced Image Suite
*   **AI Image Generation:** Generates high-fidelity artwork from natural language prompts utilizing the Clipdrop Text-to-Image API.
*   **AI Background Removal:** Removes backgrounds from uploaded images using Cloudinary's background removal transforms.
*   **AI Object Removal:** Erases specified objects from uploaded images seamlessly via Cloudinary's Generative AI Object Removal.

### 📄 AI Career tools
*   **Resume Reviewer:** Parses and analyzes PDF resumes (using `pdf-parse`) and generates detailed recruiter-level feedback (overall impression, strengths, weaknesses, and actionable suggestions) using `gemini-2.5-flash`.

### 👥 Dashboard & Community Portal
*   **Creations Dashboard:** View, delete, and publish creations to a community workspace.
*   **Community Feed:** A public feed where users can browse community-generated images, like or unlike creations, and share inspiration.
*   **Subscription plans:** Integrated premium access levels. Standard users get up to 10 free generations for text content, while advanced suites (image generation, image editing, resume review) are reserved for premium plan holders.
*   **Feedback Portal:** An integrated rating and feedback submission modal allowing users to submit ratings and reviews.

---

## 🛠️ Tech Stack

### Frontend
*   **Framework:** React 19 (via Vite)
*   **Styling:** Tailwind CSS v4 (using `@tailwindcss/vite` plugin)
*   **Routing:** React Router DOM v7
*   **Authentication:** Clerk (`@clerk/react`)
*   **State & Networking:** Axios, React Hot Toast
*   **Icons & Text:** Lucide React, React Markdown (for rendering rich text formatting from AI responses)

### Backend
*   **Framework:** Node.js & Express
*   **Database:** Neon PostgreSQL Serverless driver (`@neondatabase/serverless`)
*   **Authentication & Billing:** Clerk Express middleware (`@clerk/express`)
*   **AI Models:** Google Gemini 2.5 Flash API (interfaced via OpenAI SDK compatibility endpoint)
*   **Image Processing:** Clipdrop API (Text-to-Image) & Cloudinary SDK (Generative Fill/Remove & Background Removal)
*   **File Handling:** Multer (multipart form-data parsing)
*   **PDF Parsing:** PDF Parse (for resume text extraction)

---

## 📁 Directory Structure

```text
AITool/
├── client/                 # React Frontend Application
│   ├── src/
│   │   ├── assets/         # Static assets, logos, and dummy configurations
│   │   ├── components/     # Reusable UI elements (Navbar, Sidebar, Footer, AI tools, FeedbackModal)
│   │   ├── pages/          # Layout & Page Views (Home, Dashboard, BlogTitles, WriteArticle, GenerateImages, etc.)
│   │   ├── App.jsx         # Routes definition
│   │   ├── index.css       # Tailwind import & custom variables
│   │   └── main.jsx        # App entrypoint and Clerk Provider wrapper
│   ├── package.json        # Frontend dependencies & scripts
│   └── vite.config.js      # Vite configuration with Tailwind CSS v4 support
│
└── server/                 # Express Backend API
    ├── configs/            # Configs for Cloudinary, Neon PostgreSQL, and Multer upload settings
    ├── controller/         # AI controllers (aiController.js) and User/Feedback controllers (userController.js)
    ├── middlewares/        # Custom Authentication and Plan gating middleware (auth.js)
    ├── routes/             # Express routes (aiRoutes.js, userRoutes.js)
    ├── server.js           # Server starter file & main setup
    └── package.json        # Backend dependencies & scripts
```

---

## 🗄️ Database Schema Setup

The application uses **Neon PostgreSQL** to persist user creations and feedback. Execute the following SQL commands in your Neon console to initialize the tables before launching the application:

### 1. Creations Table
```sql
CREATE TABLE IF NOT EXISTS creations (
    id SERIAL PRIMARY KEY,
    user_id TEXT NOT NULL,
    prompt TEXT NOT NULL,
    content TEXT NOT NULL,
    type TEXT NOT NULL,
    publish BOOLEAN DEFAULT FALSE,
    likes TEXT[] DEFAULT ARRAY[]::TEXT[],
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 2. Feedbacks Table
```sql
CREATE TABLE IF NOT EXISTS feedbacks (
    id SERIAL PRIMARY KEY,
    user_id TEXT NOT NULL,
    user_name TEXT,
    user_email TEXT,
    rating INTEGER NOT NULL,
    feedback TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## ⚙️ Environment Variables Setup

You must configure environment files in both the `client` and `server` folders before running the project.

### Frontend (`/client/.env`)
Create a `.env` file inside the `client` directory:
```env
# Clerk Publishable Key for auth UI integration
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key

# Backend API base URL
VITE_BASE_URL=http://localhost:3000
```

### Backend (`/server/.env`)
Create a `.env` file inside the `server` directory:
```env
# Neon PostgreSQL database connection string
DATABASE_URL=your_postgresql_connection_string

# Clerk credentials for Express middleware authentication
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Google Gemini API key (used via the OpenAI-compatible endpoint)
GEMINI_API_KEY=your_gemini_api_key

# Clipdrop API key (needed for Text-to-Image generation)
CLIPDROP_API_KEY=your_clipdrop_api_key

# Cloudinary credentials for media management and AI transformations
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Server Port (optional, defaults to 3000)
PORT=3000
```

---

## 🚀 Getting Started

Follow these steps to configure and run the application locally.

### Prerequisites
*   Node.js (v18 or above recommended)
*   NPM or Yarn
*   A Neon DB PostgreSQL Instance
*   Clerk Account (for authentication and subscription states)
*   Cloudinary Account (with AI transformations enabled)
*   Clipdrop Developer Account (API Key)
*   Google AI Developer Key (for Gemini)

### Step 1: Clone the Repository
```bash
git clone <repository-url>
cd Quick_AI_-Tool
```

### Step 2: Set up the Backend Server
1. Navigate to the server folder:
   ```bash
   cd server
   ```
2. Install the backend dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file and populate it using the template in the [Environment Variables](#environment-variables-setup) section.
4. Run the database setup script in your Neon console (see [Database Schema Setup](#database-schema-setup)).
5. Start the backend development server:
   ```bash
   npm run server
   ```
   *The server should run on `http://localhost:3000` (or your custom PORT).*

### Step 3: Set up the React Frontend
1. Open a new terminal and navigate to the client folder:
   ```bash
   cd client
   ```
2. Install the frontend dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file and populate it using the template in the [Environment Variables](#environment-variables-setup) section.
4. Run the Vite development server:
   ```bash
   npm run dev
   ```
5. Open your browser and navigate to `http://localhost:5173` (or the port specified by Vite).

---

## 📦 Production Builds

To compile and optimize the client application for production:
```bash
cd client
npm run build
```
The output files will be built in the `client/dist` directory, ready to be deployed on static hosting providers like Vercel, Netlify, or AWS Amplify.

---

## 📝 License
This project is licensed under the [MIT License](LICENSE).
