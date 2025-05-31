Here's an updated `README.md` for your Node.js + TypeScript REST API project using SQLite, following the 12-Factor App methodology and clean architecture patterns, with Docker and Swagger support:

---

# 🎬 Movie API

A TypeScript-based REST API that exposes movie data stored in two SQLite databases (`movies.db`, `ratings.db`), following clean architecture, design patterns, and [12-Factor App](https://12factor.net/) principles.

---

## 🚀 Features

* REST API built with **Express** + **TypeScript**
* Uses **SQLite** databases:

  * `movies.db` (movie data)
  * `ratings.db` (user ratings)
* Clean architecture:

  * Layered design (Controller → Service → Repository)
  * Dependency Injection
* **Pagination**, **sorting**, and **filtering** support
* **Swagger UI** for API documentation
* **Jest** testing (excluded from production builds)
* Runs via **Docker** with DBs mounted as volumes

---

## 📁 Project Structure

```
.
├── db/                  # Contains SQLite databases (host-mounted)
├── src/
│   ├── controllers/     # Express route handlers
│   ├── services/        # Business logic
│   ├── repositories/    # SQLite DB queries
│   ├── routes/          # API routes
│   ├── utils/           # Pagination, formatting, etc.
│   ├── config/          # App/environment config
│   └── swagger.ts       # Swagger setup
├── __tests__/           # Unit tests (excluded from build)
├── Dockerfile           # Multi-stage Docker build
├── docker-compose.yml   # Compose setup with volume-mounted DBs
├── tsconfig.json        # TypeScript config
└── README.md
```

---

## 🛠 Setup

### 1. Clone and install

```bash
git clone https://github.com/prankris/movie-api.git
cd movie-api
npm install
```

### 2. Run locally

```bash
npm run build
npm start
```

> Make sure `db/movies.db` and `db/ratings.db` exist.

---

## 🧪 Run Tests

```bash
npm run test
```

---

## 🐳 Run with Docker

### 1. Ensure `db/` contains:

```
db/
├── movies.db
└── ratings.db
```

### 2. Build and start

```bash
docker-compose up --build
```

### 3. Access API

* Base URL: `http://localhost:3000/api`
* Swagger Docs: `http://localhost:3000/api/docs`

---

## 🧭 API Endpoints

### `GET /api/movies`

* List all movies (paginated, 50 per page)

### `GET /api/movies/{imdbId}`

* Movie details with average rating

### `GET /api/movies/year/{year}`

* Movies released in a specific year (with sort support)

### `GET /api/movies/genre/{genre}`

* Movies filtered by genre

---

## 📖 Swagger Docs

After running:

```
http://localhost:3000/api/docs
```

Uses `swagger-jsdoc` and `swagger-ui-express`.

---

## 📦 12-Factor Compliance

* ✅ Codebase (versioned in Git)
* ✅ Dependencies (`package.json`)
* ✅ Config via ENV variables
* ✅ Backing services via DB volumes
* ✅ Stateless & process-based
* ✅ Port binding (Docker exposes `3000`)
* ✅ Logs via `stdout`
* ✅ Dev/prod parity via Docker
* ✅ Build/release/run separation (via multi-stage Dockerfile)

