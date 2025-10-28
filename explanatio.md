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

  

 ip3 explanation
 1 in vs code i created a vagrantfile and defined what i would like it to set up my vm using the image given
2 i alocated the servers and cpus also took care of portforwading
3. then run vagrant up to build the vm
3 i then started on ansible whre i created a folder in the root for that
5created roles the docker one to make sure it downloaded ,installed and porvided the key and all docker requirementa and restarted the dockr  also included the volume and network i wanted
6 the frontend and backend roles they made sure network and volume existed before creating the containers
7.var role which defined all variables in one place for easy acces
8.mongo role to set up threthe db and makesure it is running atleast on ten tries with 5 sec intervals
9tested thia roles individualy and they pased exept for the front end which i had to update some file in the client folder to be able to get both container and host end points at once the recreated and pushed the container to docker hun and re tested it passed 
10.defined mt main ansible playbook to run all this roles via tags i had given them this is after it cloned the repo to the vm whre i also define the location base url
11. did testing and after several time of debuging all worked and ansible is now provisioning not docker compose 
12. teraform i could not set up because the account i have on aws is out of free tire and the gcp is stil not accepting the card
   
   
   
   sudo modprobe -r kvm_intel kvm

