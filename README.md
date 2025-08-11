# 🎬 Movie Booking System

![Go Version](https://img.shields.io/badge/Go-1.21+-00ADD8?logo=go)
![React Native](https://img.shields.io/badge/React%20Native-0.73-blue?logo=react)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-13+-336791?logo=postgresql)
![Docker](https://img.shields.io/badge/Docker-ready-2496ED?logo=docker)
![Kubernetes](https://img.shields.io/badge/Kubernetes-ready-326CE5?logo=kubernetes)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

A **full-stack movie booking application** built with:

* **Backend:** Golang (GORM, PostgreSQL)
* **Frontend:** React Native
* **Database:** PostgreSQL
* **Deployment Ready:** Kubernetes manifests included
* **Dockerized:** Multi-stage builds for production-ready images

---

## ⚠️ Important Note

The **PostgreSQL database is not hosted yet**.
You must run it locally for now — either directly on your machine or via Docker.

---

## 🗄 Local PostgreSQL Setup (Required Before Running)

### Option 1 — Run via Docker (recommended)

```bash
docker run --name movie-postgres \
    -e POSTGRES_DB=mbs \
    -e POSTGRES_USER=<your_db_user> \
    -e POSTGRES_PASSWORD=<your_db_password> \
    -p 5432:5432 \
    -d postgres:13
```

### Option 2 — Run on Local Machine

1. Install PostgreSQL from [https://www.postgresql.org/download/](https://www.postgresql.org/download/)
2. Start PostgreSQL service:

   ```bash
   sudo service postgresql start   # Linux  
   brew services start postgresql  # macOS  
   ```
3. Create the database and user:

   ```sql
   psql -U postgres
   CREATE DATABASE mbs;
   CREATE USER <your_db_user> WITH PASSWORD '<your_db_password>';
   GRANT ALL PRIVILEGES ON DATABASE mbs TO <your_db_user>;
   ```

---

## 🛠 Backend Configuration

Create a `config.yaml` in the backend root:

```yaml
user: <your_db_user>
password: "<your_db_password>"
dbname: mbs
host: localhost
port: "5432"
sslmode: disable
```

---

## 📌 Features

* **Movie Management**: View all movies, search by language or keyword
* **Theatre Management**: View theatres, filter by name/location
* **Show Scheduling**: Associate movies with theatres and times
* **Seat Layouts**: Auto-prefill seats for a show
* **Bookings**: Create and retrieve bookings, view booked seats
* **REST API Endpoints** for all core operations

---

## 🛠 Tech Stack

| Component     | Technology              |
| ------------- | ----------------------- |
| Backend       | Golang (net/http, GORM) |
| Frontend      | React Native            |
| Database      | PostgreSQL              |
| Deployment    | Kubernetes, Docker      |
| Config Format | YAML                    |

---

## 🗄 Database Schema

The system uses the following tables:

* **Movies**
* **Users**
* **Theatre**
* **Shows**
* **Seats**
* **Bookings**

See `migrations` for the **full SQL structure** including constraints and relationships.

---

## ⚙️ Local Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/<your-username>/movie-booking-app.git
cd movie-booking-app
```

### 2️⃣ Start PostgreSQL locally

(If you haven’t already done so, follow the **Local PostgreSQL Setup** section above.)

### 3️⃣ Run database migrations

The repo uses **goose** for migrations:

```bash
goose postgres "user=<your_db_user> password=<your_db_password> dbname=mbs host=localhost sslmode=disable" up
```

### 4️⃣ Start the backend

```bash
cd backend
go run main.go
```

By default, it runs at **`http://localhost:8080`**

### 5️⃣ Run the frontend

```bash
cd frontend
npm install
npm start
```

---

## 🚀 Running with Docker

Build and run the backend:

```bash
docker build -t movie-backend .
docker run -p 8080:8080 movie-backend
```

---

## ☸ Kubernetes Deployment

All manifests are in `k8s/`:

* **Postgres Deployment & PVC**
* **Backend Deployment & Service**
* **Nginx Reverse Proxy**
* **ConfigMaps for backend config**

To deploy:

```bash
kubectl apply -f k8s/
```

---

## 🔗 API Endpoints

| Method | Endpoint                              | Description                       |
| ------ | ------------------------------------- | --------------------------------- |
| GET    | `/movies`                             | Get all movies (supports filters) |
| GET    | `/movie?id={id}`                      | Get movie by ID                   |
| GET    | `/theatres`                           | Get all theatres                  |
| POST   | `/bookings`                           | Create a booking                  |
| GET    | `/getBookingById?id={id}`             | Get booking by ID                 |
| GET    | `/getBookedSeatsForShow?show_id={id}` | Get booked seats                  |
| POST   | `/prefill-shows`                      | Auto-create shows                 |
| POST   | `/prefill-seats?show_id={id}`         | Auto-create seats for a show      |

---

## 📦 Folder Structure

```
backend/
 ├── core/                  # Business logic
 ├── models/                # Entity & request/response models
 ├── providers/database/    # Database connection logic
 ├── server/http/           # API route handlers
 ├── config.yaml            # DB config
 ├── main.go
frontend/
 ├── ...                    # React Native UI code
k8s/
 ├── postgres.yaml
 ├── backend.yaml
 ├── nginx.yaml
```

## 📝 Notes

* The **PostgreSQL DB is not hosted** — you must run it locally (see setup section above).
* The **frontend** is built for mobile experience but can run locally with Expo.
* Make sure to **update `config.yaml`** with your PostgreSQL credentials before running locally.

---

## 📄 License

This project is licensed under the **MIT License**.
