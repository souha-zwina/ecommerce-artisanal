## 🚀 Déploiement avec Kubernetes

### Prérequis
- Docker Desktop (avec Kubernetes activé)
- kubectl

### Déployer l'application
```bash
# Appliquer les configurations
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml

# Vérifier le déploiement
kubectl get pods
kubectl get services

# Accéder à l'API
http://localhost:30080
