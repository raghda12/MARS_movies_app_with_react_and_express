# MARS Movie App (Full-Stack Integration) 🎬

Welcome to the **MARS Movie App**, a professional Full-Stack application built using the **MERN** stack (MongoDB, Express, React, Node.js). This project demonstrates a complete integration between a modern React frontend and a robust Express/Node.js backend.

## 🚀 Features

- **Full CRUD Operations**: Create, Read, Update, and Delete movies directly from the UI, with real-time synchronization to a MongoDB database.
- **Search & Filter**: Instantly search for movies by title.
- **Dynamic UI**: Responsive design featuring a movie carousel and detailed view.
- **API Integration**: Frontend communicates with a custom RESTful API using `fetch`.
- **State Management**: Uses React Context API and `useReducer` for clean, scalable state management.
- **Data Persistence**: All movie data is stored securely in MongoDB.

## 🛠️ Technologies Used

### Frontend
- **React.js** (Vite)
- **Context API & useReducer**
- **CSS3** (Custom styling)

### Backend
- **Node.js & Express.js**
- **MongoDB & Mongoose** (ODM)
- **CORS** (Cross-Origin Resource Sharing)
- **Dotenv** (Environment variables management)

---

## ⚙️ Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd MARS_movies_app_with_react_and_express
```

### 2. Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend/` folder and add your MongoDB URI:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/movie-app
   ```
4. Start the server:
   ```bash
   npm run dev
   ```

### 3. Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend/movie-app
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the React app:
   ```bash
   npm run dev
   ```

---

## 📡 API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **GET** | `/api/movies` | Fetch all movies from the database |
| **GET** | `/api/movies/:id` | Fetch details of a specific movie |
| **POST** | `/api/movies` | Add a new movie |
| **PUT** | `/api/movies/:id` | Update an existing movie |
| **DELETE** | `/api/movies/:id` | Remove a movie from the database |

---

## 📁 Project Structure

```text
MARS_movies_app_with_react_and_express/
├── backend/
│   ├── models/          # Mongoose Schemas
│   ├── .env             # Environment variables (Ignored by Git)
│   ├── index.js         # Express server entry point
│   └── package.json
├── frontend/
│   └── movie-app/       # React application (Vite)
│       ├── src/
│       │   ├── components/
│       │   ├── context/   # State management & API calls
│       │   └── App.jsx
└── README.md
```

## 🔒 Security Note
The `.env` file is excluded from version control via `.gitignore` to protect sensitive information like database credentials.

---
*Developed as part of the Computer Systems Engineering program curriculum.*
