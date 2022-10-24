pipeline {
    agent any

    stages {
        stage('Test') {
            steps {
                echo 'Testing..'
                sh ' ls -ltr '
            }
        }
        stage('Build') {
            steps {
                echo 'Building Application..'
                sh 'docker-compose up --build -d'
                echo 'Building Application Done !!!..'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
                sh 'docker ps'
                echo 'Deployed Application ....'
            }
        }
    }
}
