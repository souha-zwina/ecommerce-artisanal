pipeline {
    agent any

    environment {
        // Vos identifiants Docker Hub
        DOCKER_HUB_USERNAME = 'votre-username-docker'  // ← CHANGEZ ICI !
        DOCKER_IMAGE_NAME = 'artisanal-backend'
        DOCKER_TAG = 'latest'

        // Chemin vers votre projet
        PROJECT_PATH = 'C:/projet_Ecommerce/artisanal-backend'
    }

    stages {
        stage('📦 Checkout') {
            steps {
                echo 'Récupération du code depuis GitHub...'
                checkout scm
            }
        }

        stage('🛠️ Build Maven') {
            steps {
                echo 'Compilation du projet Spring Boot...'
                sh '''
                    cd ${PROJECT_PATH}
                    mvn clean package -DskipTests
                '''
            }
        }

        stage('🧪 Tests') {
            steps {
                echo 'Exécution des tests unitaires...'
                sh '''
                    cd ${PROJECT_PATH}
                    mvn test
                '''
            }
        }

        stage('🐳 Build Docker') {
            steps {
                echo 'Construction de l\'image Docker...'
                sh '''
                    cd ${PROJECT_PATH}
                    docker build -t ${DOCKER_HUB_USERNAME}/${DOCKER_IMAGE_NAME}:${DOCKER_TAG} .
                '''
            }
        }

        stage('📤 Push Docker Hub') {
            steps {
                echo 'Envoi de l\'image sur Docker Hub...'
                withCredentials([string(credentialsId: 'docker-hub-password', variable: 'DOCKER_PWD')]) {
                    sh '''
                        echo ${DOCKER_PWD} | docker login -u ${DOCKER_HUB_USERNAME} --password-stdin
                        docker push ${DOCKER_HUB_USERNAME}/${DOCKER_IMAGE_NAME}:${DOCKER_TAG}
                    '''
                }
            }
        }

        stage('☸️ Deploy Kubernetes') {
            steps {
                echo 'Déploiement sur Kubernetes...'
                sh '''
                    cd ${PROJECT_PATH}
                    kubectl apply -f k8s/deployment.yaml
                    kubectl apply -f k8s/service.yaml
                    kubectl rollout status deployment/artisanal-backend
                '''
            }
        }

        stage('✅ Vérification') {
            steps {
                echo 'Vérification du déploiement...'
                sh '''
                    kubectl get pods
                    kubectl get services
                '''
            }
        }
    }

    post {
        success {
            echo '🎉 PIPELINE RÉUSSI !'
            echo 'Application disponible sur : http://localhost:30080'
        }
        failure {
            echo '❌ PIPELINE ÉCHOUÉ !'
            echo 'Vérifiez les logs ci-dessus.'
        }
        always {
            echo '📋 Fin du pipeline.'
        }
    }
}