pipeline {
    agent { label 'JenkinsSlave03' }  // Specify the agent here
    
    environment {
        DOCKERHUB_CREDENTIALS = credentials('Dockerhub')
    }
    
    stages {
        stage('Build Docker Image') {
            steps {
                dir('backend') {
                    sh 'docker build -t mohamedessam1911/project-backend .'
                }
            }
        }
	stage('Frontend') {
            steps {
                dir('frontend') {
                    sh 'docker build -t mohamedessam1911/project-frontend .'
                }
            }
        }
        
        stage('Docker Login') {
            steps {
                sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
            }
        }
        
        stage('Push Docker Image') {
            steps {
                script {
                    sh 'docker push mohamedessam1911/project-backend:latest'
		    sh 'docker push mohamedessam1911/project-frontend:latest'
                }
            }
        }
        
        stage('Deploy to Kubernetes') {
            steps {

                    sh 'kubectl apply -f k8s/'
            }
        }
    }
    
    post {
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}
