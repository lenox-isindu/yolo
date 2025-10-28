# Overview
This project involved the containerization and deployment of a full-stack yolo application using Docker.


# Requirements
Install the docker engine here:
- [Docker](https://docs.docker.com/engine/install/) 

## 
RUN THE FRONTENd
npm run build
serve -s build

BACKEND

npm start

DOCKER COMPOSE
docker compose up


ip3 set up

run this comands to get things running
1 clone the repo
2 vagrant up inside the root folder
if any error is encounter that states it an auth chage run this to remove the old key = ssh-keygen -f "/home/moringa/.ssh/known_hosts" -R "[127.0.0.1]:2222"

make sure to have .env file in both front end and backend in this format eg
frontend
MONGODB_URI=mongodb://mongo:27017/yolomy
PORT=5000
backend
MONGODB_URI=mongodb://mongo:27017/yolomy
PORT=5000
but no wories as if yo fail to add the container will handlee that gracefully

3 run the playbook to provision services= ansible-playbook ansible/yolo.yml

visit localhost:300  for frontend that is if it is free on your host machine if noty edit that in the vagrantfile and forward to another free port same to backend

backend  localhost/5000/api

the whole application is fired up now