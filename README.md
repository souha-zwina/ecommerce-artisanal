# ecommerce-artisanal

Application Backoffice développée avec Angular 20.

## Prérequis

### Exécution sans Docker

Assurez-vous d'avoir installé :

- Node.js **v20**
- Angular CLI **v20**


## Lancer le projet (sans Docker)

Démarrez le serveur de développement :

```bash
ng serve
```

L'application sera accessible à l'adresse :

```text
http://localhost:4200
```

---

## Exécution avec Docker

Assurez-vous d'avoir Docker installé puis exécutez :

```bash
docker run -d -p 9090:80 artisan-backoffice:latest
```

L'application sera accessible à l'adresse :

```text
http://localhost:9090
```

---

## Compte Administrateur

Utilisez les identifiants suivants pour vous connecter :

| Champ        | Valeur             |
| ------------ | ------------------ |
| Email        | `admin@artisan.ma` |
| Mot de passe | `admin123`         |

---


## Technologies utilisées

* Angular 20
* Node.js 20
* Docker
* TypeScript
