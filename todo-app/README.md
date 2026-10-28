# DevOps with Kubernetes — Exercise 1.2

Minimal Node.js HTTP server for the University of Helsinki DevOps with Kubernetes course.

On startup, it reads `PORT` (default `3000`) and logs `Server started in port 3000`.

## Build and deploy to your local k3d cluster

Run these commands in PowerShell from the folder where you extracted this ZIP:

```powershell
docker build -t todo-app:1.2 .\\todo-app
k3d image import todo-app:1.2 -c k3s-default
kubectl apply -f .\\todo-app\\manifests\\deployment.yaml
kubectl rollout status deployment/todo-app
kubectl logs deployment/todo-app
```

Expected log: `Server started in port 3000`. The exercise does not require a Service or port-forward.

To choose another port locally:

```powershell
$env:PORT = "8080"
node .\\todo-app\\server.js
```

To remove only this exercise deployment:

```powershell
kubectl delete -f .\\todo-app\\manifests\\deployment.yaml
```
