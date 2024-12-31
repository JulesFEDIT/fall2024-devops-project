# DevOps Project: Web Application with CI/CD, IaC, and Container Orchestration

## Overview

This project delivers a **user API web application** with CRUD functionality, leveraging **Redis** for data storage, accompanied by a comprehensive CI/CD pipeline, infrastructure provisioning, and container orchestration. Below is a detailed breakdown of the work performed.

---

## Work Performed

### Web Application:
   - Developed a user API with CRUD functionality in javascript.
     - Create an user. To create an user, you have to provide an id, a name and an email
     - We use Postman for queries execution.
          
   ![Capture d'écran 2024-12-29 162656](https://github.com/user-attachments/assets/202b9c72-16dd-4c7f-893b-19d8ab4fd370)

   ![Capture d'écran 2024-12-29 162724](https://github.com/user-attachments/assets/7e8e333a-5727-4b01-b518-5a318d28bf27)
   
   - Update an user

![Capture d'écran 2024-12-29 163109](https://github.com/user-attachments/assets/3ed5fb85-727b-4c78-a33d-0e0148d1e67a)

![Capture d'écran 2024-12-29 163123](https://github.com/user-attachments/assets/66629677-79c4-4d93-9fa2-03317cc79cc1)

   - Delete an user
   
![Capture d'écran 2024-12-29 163147](https://github.com/user-attachments/assets/b3052b86-7a10-4eb9-afb0-6fe9979348dd)

   - Implemented Redis as the database backend:
   
     ![image](https://github.com/user-attachments/assets/cf00bead-30b7-4016-9d21-edd9a4389ef9)

   - Included a health check endpoint (`/health`) for application status monitoring
   
     ![image](https://github.com/user-attachments/assets/856d6821-af79-4b7b-b169-18387435961e)

   - Wrote tests to validate the good working of the application
      - Unit test (`tests/unit/userController.test.js`)
        
     ![Capture d'écran 2024-12-29 173148](https://github.com/user-attachments/assets/ef220218-49e7-4ffe-931d-c5fb5fd5f851)

     - Api test (`tests/api/api.test.js`)

     ![Capture d'écran 2024-12-29 174441](https://github.com/user-attachments/assets/eddfaa7a-e001-46da-8ca8-27237a9a8407)

     - Configuration test (`tests/config/config.test.js`)
     
     ![Capture d'écran 2024-12-29 175034](https://github.com/user-attachments/assets/566590e1-cf29-4ded-878b-3a12cc36ddef)

     - Connection test (`tests/connection/connection.tests.js`)

     ![Capture d'écran 2024-12-29 173452](https://github.com/user-attachments/assets/f709b75e-cc77-49cf-b894-15b0988ac688)

### CI/CD Pipeline:
   - Configured a CI/CD pipeline using GitHub Actions.
   - Integrated build, test, and deployment stages.
   - Deployed the application to Netlify.

### Infrastructure as Code (IaC):
   - Created a virtual machine using Vagrant (`iac/Vagrantfile`) using centos7 box.
   - Provisioned the VM with Ansible (`iac/playbooks/provision.yml`) to install:
     - Language runtime.
     - Redis database.
     - The web application.
     - Set up health checks during provisioning.
   - I had some difficulties for this task because I was not be able to create sync folders for my application.

![Capture d'écran 2024-12-30 163404](https://github.com/user-attachments/assets/ca462fbc-2c98-4eb0-8e8f-4d67ce6721ea)

This the error message I got.

### Docker Image:
   - Built a Docker image for the application (`user-api/Dockerfile`).

   ![Capture d'écran 2024-12-30 182150](https://github.com/user-attachments/assets/13092c6d-74d7-46f4-8c7a-ef488aaa0545)

   ![Capture d'écran 2024-12-30 182804](https://github.com/user-attachments/assets/7a13817e-a1aa-458d-a966-40f17533e521)

   ![Capture d'écran 2024-12-30 182844](https://github.com/user-attachments/assets/f689d47c-9e69-4b24-a3e7-0912ddf00c5e)

   We have access to the health check of the application using containers. It works !

   - Published the image to Docker Hub: [Docker Hub Link to the application](https://hub.docker.com/r/julesfedit/user-api).

     ![Capture d'écran 2024-12-30 183138](https://github.com/user-attachments/assets/4487c4bc-c0c5-4f70-afa5-664382a40f11)


### Container Orchestration with Docker Compose:
   - Created a `docker-compose.yml` to orchestrate the application and Redis containers.

     ![Capture d'écran 2024-12-30 191004](https://github.com/user-attachments/assets/ae1b8557-02f9-4cc5-b3fd-4c80a9ac5890)

     ![Capture d'écran 2024-12-30 191018](https://github.com/user-attachments/assets/c41fe8b4-a1e3-4159-a6fd-2a66b81f9a24)

     The application is running using `docker-compose.yml` file. 

### Kubernetes Orchestration:
   - Installed Kubernetes cluster using Minikube.
     
   ![Capture d'écran 2024-12-31 112848](https://github.com/user-attachments/assets/1623751d-8903-4903-b806-7e61f993dfbd)

   - Configured Kubernetes manifests for:
     - Deployment and Service for the user-api application (`k8s/user-api-deployment.yaml`).

      ![Capture d'écran 2024-12-30 201817](https://github.com/user-attachments/assets/c0b7ac5b-c39d-48de-ac11-b90804497c84)

     - Deployment, Service, and PersistentVolumeClaim for Redis (`k8s/redis-deployment.yaml`).

      ![Capture d'écran 2024-12-30 201812](https://github.com/user-attachments/assets/4b2444e5-3bd2-4d76-a9a6-c72b7dfc5d25)

     - PersistentVolume and PersistentVolumeClaim for Redis data (`k8s/persistent-volume.yaml`).
    
     ![Capture d'écran 2024-12-30 201805](https://github.com/user-attachments/assets/a9c60d81-18af-4dd8-b400-a41fac9371fd)
       
     - We verify that all resources are running

       ![Capture d'écran 2024-12-30 203132](https://github.com/user-attachments/assets/4326a7cf-52bd-47c6-924d-fcf5dc89283e)

       ![Capture d'écran 2024-12-30 203157](https://github.com/user-attachments/assets/2d0c5977-aa6d-4279-829f-49ce1d5a4d3a)

       ![Capture d'écran 2024-12-30 203203](https://github.com/user-attachments/assets/b4769ab5-0f17-4678-abec-e75c6edd9316)

## Instructions

### Installation (Prepare Environment)

1. **Clone Repository**:
   ```bash
   git clone https://github.com/JulesFEDIT/fall2024-devops-project.git
   ```

2. **Launch redis-server**
   - You have to lauch `redis-server.exe` in order to establish the connection with the database and let it open. Without doing this, the application will not work properly.
     
3. **Install dependencies, inside `user-api` folder**
   ```bash
   npm install
   ```  
4. **Set Up Virtual Machine**:
    - Install Vagrant: https://www.vagrantup.com/downloads.html
    - Insatll VirtualBox:  https://www.virtualbox.org/wiki/Downloads
    - Run:
    ```
    vagrant up
    ```
5. **Provisioning**:

    Ansible will automatically install dependencies, database, and the application.
6. **Prepare Docker Environment**:

   - Install Docker
      - Set up Docker's apt repository.
   ```
   # Add Docker's official GPG key:
   sudo apt-get update
   sudo apt-get install ca-certificates curl
   sudo install -m 0755 -d /etc/apt/keyrings
   sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
   sudo chmod a+r /etc/apt/keyrings/docker.asc
   
   # Add the repository to Apt sources:
   echo \
     "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
     $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
     sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
   sudo apt-get update
   ```
      - Install the Docker packages.
   ```
   sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
   ```
    - Install Docker Compose.
   ```
   sudo apt-get update
   sudo apt-get install docker-compose-plugin
   ```
7. **Install Kubernetes**:

    - Install Minikube:
      - Download for the latest release.
    ```
   New-Item -Path 'c:\' -Name 'minikube' -ItemType Directory -Force
   Invoke-WebRequest -OutFile 'c:\minikube\minikube.exe' -Uri 'https://github.com/kubernetes/minikube/releases/latest/download/minikube-windows-amd64.exe' -UseBasicParsing
    ```
      - Add the minikube.exe binary to your PATH.
   ```
   $oldPath = [Environment]::GetEnvironmentVariable('Path', [EnvironmentVariableTarget]::Machine)
   if ($oldPath.Split(';') -inotcontains 'C:\minikube'){
     [Environment]::SetEnvironmentVariable('Path', $('{0};C:\minikube' -f $oldPath), [EnvironmentVariableTarget]::Machine)
   }
   ```
    - Start the cluster:
    ```
    minikube start
    ```

### Usage

1. **Run the Web Application**:

    - Locally:
      - Run this command inside `user-api` folder.
    ```
    npm start
    ```

    - With Docker Compose:
      - Run this command at the root of the project.
    ```
    docker-compose up
    ```

    - On Kubernetes:
      - Run this command at the root of the project.
    ```
    kubectl apply -f k8s/
    ```

2. **Access to the application**:

    - Locally: http://localhost:3000

    - Kubernetes: Get service URL:
    ```
    minikube service user-api-service
    ```
    ![Capture d'écran 2024-12-30 203527](https://github.com/user-attachments/assets/6bcbc4a7-2526-4559-9139-6b8c9fb9e79d)

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

1. Run Tests inside the `user-api/tests` folder:
   - Unit test
    ```
    npx jest tests/unit/userController.test.js
    ```
   - API test
    ```
    npx jest tests/api/api.test.js
    ```
   - Configuration test
    ```
    npx jest tests/config/config.test.js
    ```
   - Connection test
    ```
    npx jest tests/connection/connection.test.js
    ```
3. Health Check:

    Endpoint: http://localhost:3000/health 


### Links and Platforms

   - Docker Hub: [Docker Hub Link](https://hub.docker.com/)
   - Kubernetes Cluster: [Cluster Info](https://kubernetes.io/)
   - Postman: [Postman info](https://www.postman.com/)
   - Minikube: [Minikube info](https://minikube.sigs.k8s.io/docs/)

   
### Authors

Gauthier MALLARD & Jules FEDIT

Emails: gauthier.mallard@edu.ece.fr  or jules.fedit@edu.ece.fr


### Additional Information

   - Logs, configurations, and scripts are available in their respective folders.
