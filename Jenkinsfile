pipeline {
    agent any

    environment {
        DOCKER_HUB_USERNAME = 'souhaila'  // ← METTEZ VOTRE USERNAME
        DOCKER_IMAGE_NAME = 'artisanal-backend'
        DOCKER_TAG = 'latest'
    }

    stages {
        stage('Build Maven') {
            steps {
                sh '''
                    chmod +x mvnw
                    ./mvnw clean package -DskipTests
                '''
            }
        }

        stage('Build Docker') {
            steps {
                sh '''
                    docker build -t ${DOCKER_HUB_USERNAME}/${DOCKER_IMAGE_NAME}:${DOCKER_TAG} .
                '''
            }
        }

        stage('Push Docker') {
            steps {
                withCredentials([string(credentialsId: 'docker-hub-password', variable: 'DOCKER_PWD')]) {
                    sh '''
                        echo ${DOCKER_PWD} | docker login -u ${DOCKER_HUB_USERNAME} --password-stdin
                        docker push ${DOCKER_HUB_USERNAME}/${DOCKER_IMAGE_NAME}:${DOCKER_TAG}
                    '''
                }
            }
        }

        stage('Deploy Kubernetes') {
            steps {
                sh '''
                    kubectl apply -f k8s/deployment.yaml
                    kubectl apply -f k8s/service.yaml
                '''
            }
        }
    }
}