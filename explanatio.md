# Explanation of Implementation

## 1. Backend Containerization

- I modified `server.js` to connect to MongoDB using the Docker service name `mongo` instead of `localhost`, so that the backend could communicate with the MongoDB container through Docker's internal network.
- I added a `.env` file containing the MongoDB connection string (`MONGODB_URI=mongodb://mongo:27017/yolomy`) and loaded it in the application using `dotenv`.
- I tested the backend locally using `npm start` to confirm that the database connection worked before containerizing it.
- For containerization, I used **Node 18 Alpine** as the base image in the Dockerfile because it is lightweight and fully compatible with my dependencies.
- I then built and tagged the backend image correctly using semantic versioning (e.g. `lenoxisindu/backend:v0.0.3`).

---

## 2. Frontend Containerization

- I updated `package.json` to include the **serve** package to host the production build, since running React directly with `npm start` is not efficient in production and caused compatibility issues with the Alpine base image.
- I tested locally by running `npm run build` followed by `npm serve -s build` to confirm the static files were served correctly.
- I created a Dockerfile for the frontend using **Node 14 Alpine** for the build stage and **serve** for production hosting to reduce image size and maintain compatibility with my existing React version.
- After a few build attempts, the container served the frontend successfully.

---

## 3. Docker Compose Orchestration

- I defined a custom Docker network named **GENZ** so that all containers (MongoDB, Backend, Frontend) could communicate internally using service names.
- I set the network driver to `bridge` since it is suitable for inter-container communication in a local environment.
- I defined a Docker volume named **finance_bill** and mounted it to `/data/db` in the MongoDB container to **enable persistence**, so that product data is retained even after container restarts.
- I used the official **mongo:latest** image which is automatically pulled during `docker compose up`.
- All services were attached to the **GENZ** network and successfully connected.
- Running `docker compose up -d` successfully launched all services with persistence and internal communication in place.

---

## 4. Image Deployment

- I tagged all my final images using **semantic versioning** for clarity and maintainability.
- I pushed the images to Docker Hub under my username `lenoxisindu` so that anyone can pull and run them directly.

---

Everything is now fully containerized, versioned, persistent a single `docker-compose.yml`.

  

  ssh-keygen -f "/home/moringa/.ssh/known_hosts" -R "[127.0.0.1]:2222"


sudo modprobe -r kvm_intel kvm

