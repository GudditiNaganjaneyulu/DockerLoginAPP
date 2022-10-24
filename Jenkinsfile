pipeline {
    agent any

    stages {
        stage('Test') {
            steps {
                echo 'Testing..'
                sh ' ls -ltr '
            }
        }
        stage('Build) {
            steps {
                echo 'Building Application..'
                sh 'docker-compose up --build -d'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
                sh 'docker ps '
                sh 'curl -L http://3.6.36.50'
            }
        }
    }
}
