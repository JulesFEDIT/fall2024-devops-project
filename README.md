# DevOps Project: Web Application with CI/CD, IaC, and Container Orchestration

## Overview

This project delivers a **user API web application** with CRUD functionality, leveraging **Redis** for data storage, accompanied by a comprehensive CI/CD pipeline, infrastructure provisioning, and container orchestration. Below is a detailed breakdown of the work performed.

---

## Work Performed

1. **Web Application**:
   - Developed a user API with CRUD functionality in javascript.
   - Implemented Redis as the database backend:
   
     ![image](https://github.com/user-attachments/assets/cf00bead-30b7-4016-9d21-edd9a4389ef9)

   - Included a health check endpoint (`/health`) for application status monitoring:
   
     ![image](https://github.com/user-attachments/assets/856d6821-af79-4b7b-b169-18387435961e)

   - Wrote unit tests, API tests, and integration tests for configuration and connection validation:
  
     ![image](https://github.com/user-attachments/assets/db969a00-22c2-4cec-8f07-b0723f076fb0)

     ![image](https://github.com/user-attachments/assets/d26d9227-af6d-448b-9693-a3fd3e26d231)



2. **CI/CD Pipeline**:
   - Configured a CI/CD pipeline using GitHub Actions.
   - Integrated build, test, and deployment stages.
   - Deployed the application to Netlify.

3. **Infrastructure as Code (IaC)**:
   - Created a virtual machine using Vagrant (Linux distribution: Ubuntu/Debian/etc.).
   - Provisioned the VM with Ansible to install:
     - Language runtime.
     - Redis database.
     - The web application.
   - Set up health checks during provisioning.

4. **Docker Image**:
   - Built a Docker image for the application.
   - Published the image to Docker Hub: [Docker Hub Link].

5. **Container Orchestration with Docker Compose**:
   - Created a `docker-compose.yml` to orchestrate the application and Redis containers.

6. **Kubernetes Orchestration**:
   - Installed Kubernetes cluster using Minikube.
   - Configured Kubernetes manifests for:
     - Deployment and services for the application.
     - Persistent volume and claim for Redis.

## Instructions

### Installation (Prepare Environment)

1. **Clone Repository**:
   ```bash
   git clone https://github.com/JulesFEDIT/fall2024-devops-project.git
   ```

2. **Launch redis-server**
   - You have to lauch `redis-server.exe` in order to establish the connection with the database and let it open. Without doing this, the application will not work properly.
  
3. **Set Up Virtual Machine**:
    - Install Vagrant and VirtualBox.
    - Run:
    ```
    vagrant up
    ```
4. **Provisioning**:

    Ansible will automatically install dependencies, database, and the application.
5. **Prepare Docker Environment**:

    - Install Docker and Docker Compose.
6. **Install Kubernetes**:

    - Install Minikube:
    ```
    curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
    sudo install minikube-linux-amd64 /usr/local/bin/minikube
    ```

    - Start the cluster:
    ```
    minikube start
    ```

### Usage

1. **Run the Web Application**:

    - Locally:
    ```
    npm start
    ```

    - With Docker Compose:
    ```
    docker-compose up
    ```

    - On Kubernetes:
    ```
    kubectl apply -f k8s/
    ```

2. **Access to the application**:

    - Locally: http://localhost:3000

    - Kubernetes: Get service URL:
    ```
    minikube service [service-name]
    ```
3. **Run CRUD Operations with PowerShell**:
- CREATE an user.
  - For creating an user, you must inform an **id**, a **name** and a **email**.
```powershell
Invoke-WebRequest -Uri "http://localhost:3000/api/users" `
  -Method POST `
  -Headers @{"Content-Type"="application/json"} `
  -Body '{"id": 1, "name": "example", "email": "example@example.com"}'
```
- UPDATE an user
```powershell
Invoke-WebRequest -Uri "http://localhost:3000/api/users/1" `
  -Method PUT `
  -Headers @{"Content-Type"="application/json"} `
  -Body '{"name": "updated_example", "email": "updated_example@updated_example.com"}'
``` 
- READ an user
```powershell
Invoke-WebRequest -Uri "http://localhost:3000/api/users/1" `
  -Method GET
``` 
- DELETE an user
```powershell
Invoke-WebRequest -Uri "http://localhost:3000/api/users/1" `
  -Method DELETE
``` 

### Testing

1. Run Tests:
    ```
    npx jest tests/config/config.test.js
    ```

2. Health Check:

    Endpoint: http://localhost:3000/health 


### Links and Platforms

   - Docker Hub: [Docker Hub Link]
   - CI/CD Pipeline: [Pipeline Link]
   - Kubernetes Cluster: [Cluster Info]

   
### Authors

Gauthier Mallard & Jules Fedit

Emails: gauthier.mallard@edu.ece.fr  or jules.fedit@edu.ece.fr


### Additional Information

   - Logs, configurations, and scripts are available in their respective folders.
   - For any issues, please create a GitHub issue in the repository.



