# 📝 MERN Task Manager with Automated CI/CD Pipeline

A fully containerized production-ready MERN (MongoDB, Express.js, React, Node.js) Task Management application featuring a fully automated Continuous Integration and Continuous Deployment (CI/CD) pipeline built with GitHub Actions and deployed on AWS EC2.

---

## 🚀 Key Features
- **Full-Stack CRUD:** Seamless task tracking with an interactive React frontend and a robust Node/Express REST API.
- **Containerization:** Complete environment isolation using Docker and multi-stage Docker builds.
- **Automated CI/CD:** Continuous Integration & Deployment pipeline via GitHub Actions triggers upon every code push to the `main` branch.
- **Cloud Deployment:** Hosted on a secured AWS EC2 Ubuntu Linux instance managed through Docker Compose.
- **Zero-Downtime Deployment:** The pipeline automatically refreshes local code, pulls the latest images, and recreates containers silently.

---

## 🛠️ Tech Stack & Tools
- **Frontend:** React.js, Vite, HTML5, CSS3, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (with Mongoose ODM)
- **DevOps/Cloud:** Docker, Docker Compose, GitHub Actions, AWS EC2, Linux/Bash

---

## 📐 System Architecture & CI/CD Workflow

1. **Local Development:** Code changes are committed and pushed to the GitHub repository's `main` branch.
2. **Build Stage (GitHub Actions):** - A virtual runner checks out the repository.
   - Logs into Docker Hub using encrypted secrets.
   - Builds separate high-performance production Docker images for both frontend and backend.
   - Tags and pushes the images to the Docker Hub Registry.
3. **Deploy Stage (AWS EC2):**
   - Upon a successful build, the workflow securely establishes an SSH connection to the AWS EC2 instance.
   - Fetches changes and executes a deployment script:
     - Pulls down the latest production-ready images from Docker Hub.
     - Stops and tears down active older containers.
     - Spins up the freshly built frontend, backend, and database microservices instantly using Docker Compose in detached mode.

---

## 📂 Project Structure
```text
├── .github/workflows/
│   └── deploy.yml         # GitHub Actions pipeline configuration
├── backend/
│   ├── models/            # Database schemas
│   ├── Dockerfile         # Multi-stage production build for Backend
│   └── server.js          # Express server entry point
├── frontend/
│   ├── src/               # React components and styles
│   ├── Dockerfile         # Multi-stage production build for Frontend
│   └── vite.config.js
└── docker-compose.yml     # Orchestrates all application services