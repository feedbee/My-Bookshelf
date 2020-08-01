pipeline {
  agent {
    dockerfile {
      filename 'core/Dockerfile'
    }

  }
  stages {
    stage('Build') {
      steps {
        sh 'cd core'
      }
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
