# Log Output - DevOps with Kubernetes

A containerized Node.js application built for Exercise 1.1 of the University of Helsinki DevOps with Kubernetes course.

## Features

- Generates one random UUID when the application starts.
- Prints the same UUID with an ISO timestamp every five seconds.
- Provides a responsive web dashboard for recent logs.
- Includes a health endpoint at `/health`.
- Provides application status and recent logs at `/api/status`.
- Includes a Dockerfile and Kubernetes Deployment configuration.

## Requirements

- Node.js 22 or later
- Docker Desktop
- kubectl
- A running Kubernetes cluster

## Run locally

```powershell
npm.cmd start
```

Open http://localhost:3000.

## Run with Docker

```powershell
docker build -t log-output:1.1 .
docker run --rm -p 3000:3000 log-output:1.1
```

## Deploy to Kubernetes

```powershell
k3d image import log-output:1.1 -c k3s-default
kubectl apply -f deployment.yaml
kubectl get pods -l app=log-output
kubectl logs -f deployment/log-output
```

To access the dashboard:

```powershell
kubectl port-forward deployment/log-output 3000:3000
```

Open http://localhost:3000.

## Endpoints

| Endpoint | Purpose |
|---|---|
| `/` | Web dashboard |
| `/health` | Health check |
| `/api/status` | Application status and recent log entries |

## Course

University of Helsinki - DevOps with Kubernetes, Exercise 1.1.

https://courses.mooc.fi/org/uh-cs/courses/devops-with-kubernetes/chapter-1
