pipeline {
    agent { label 'JenkinsSlave03' }  // Specify the agent here
    
    environment {
        DOCKERHUB_CREDENTIALS = credentials('Dockerhub')
    }
    
    stages {
        stage('Backend') {
            steps {
                dir('backend') {
                    sh 'docker build --no-cache -t mohamedessam1911/project-backend:latest .'
		    sh 'docker push mohamedessam1911/project-backend:latest'
                }
            }
        }
	stage('Frontend') {
            steps {
                dir('frontend') {
                    sh 'docker build --no-cache -t mohamedessam1911/project-frontend:latest .'
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
