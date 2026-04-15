# MARS Movies App

This is a full-stack movie application built with React (Frontend) and Express (Backend).

## 👥 Team Members

* **Raghda Alnajjar**
* **Mohammed Debes**

---

## 🚀 How to Run the Project

### Prerequisites
* [Node.js](https://nodejs.org/) installed
* Git installed

### How to Run the Backend
The backend is built with Express.js and provides RESTful APIs.

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install the required dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables (create a `.env` file based on any provided `.env.example`).
4. Start the development server:
   ```bash
   npm run dev
   ```
   *(The backend server will run on `http://localhost:5000` by default).*

### How to Run the Frontend
The frontend is built using React and Vite.

1. Navigate to the frontend project directory:
   ```bash
   cd frontend/movie-app
   ```
2. Install the required dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   *(The frontend will typically be accessible at `http://localhost:5173`).*

---

## 🛠️ Features & Contributions

> *Note: Please replace the placeholder issue/PR links with the actual links from your repository.*

### Raghda Alnajjar
* **Feature:** Designed and implemented the frontend architecture and React components.
* **Related Issue:** [#Issue-1](#)
* **Related PR:** [#PR-1](#)

### Mohammed Debes
* **Feature:** Built the backend Express server, RESTful APIs, and basic mock data model.
* **Related Issue:** [#Issue-2](#)
* **Related PR:** [#PR-2](#)

*(Add more specific features you both worked on above).*

---

## 📚 API Documentation (Postman)

We utilize **Postman** to document and share our Backend APIs. 

### Endpoints Available:
* `GET /api/movies` - Get a list of all movies
* `GET /api/movies/:id` - Get details of a single movie
* `POST /api/movies` - Add a new movie
* `PUT /api/movies/:id` - Update an existing movie
* `DELETE /api/movies/:id` - Delete a movie

### How to use the Postman Collection:
1. Export the Postman Collection from the Postman App or use the provided JSON link/file (if available in the repo).
2. Import the collection into your local Postman workspace.
3. Make sure your local Backend server is running on `http://localhost:5000`.
4. Run the requests to see the expected responses for full CRUD operations.

---

## 🤔 Assumptions

* **Data Persistence:** We assumed in-memory storage (mock data) is sufficient for the MVP phase, so no external database (like MongoDB or PostgreSQL) is actively hooked up yet.
* **Env Variables:** We assumed default ports (`5000` for backend, `5173` for frontend) are available on the host machine.
* **User Authentication:** Assumed that the current version does not require user authentication/authorization.

---

## ⚠️ Known Limitations

* Any data modified (added, updated, or deleted) via the API will be lost once the backend server is restarted because we are using an array for in-memory storage.
* Lack of proper database connection (Mongoose is listed in dependencies but the code runs off mock data).
* Lack of comprehensive error handling and input validation on the API endpoints.
* No responsive styling for very small mobile screens (yet). 

---

## 📈 Progress

* **Frontend:** Initial React setup with Vite completed. Essential UI components are created.
* **Backend:** Express server is up and running with full CRUD operations for the movies resource. 
* **Integration:** CORS is configured, and the frontend can successfully communicate with the backend API.

---

## 🧗 Challenges Faced

### Individual Challenges
* **Raghda:** Managing complex state across React components and ensuring the UI remains snappy.
* **Mohammed:** Setting up the initial Express routing structure and handling CORS issues between different local ports.

### Team Challenges
* **API Contract Integration:** Syncing up the API response formats on the backend with what the frontend UI components expected.
* **Git Merges:** Handling merge conflicts when integrating frontend features with updated backend data structures. 

