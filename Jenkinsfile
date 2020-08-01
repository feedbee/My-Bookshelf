pipeline {
  agent {
    dockerfile {
      filename 'core/Dockerfile'
    }

  }
  stages {
    stage('Build') {
      agent {
        dockerfile {
          filename 'core/Dockerfile'
        }

      }
      steps {
        sh 'echo 1'
      }
    }

  }
} 
