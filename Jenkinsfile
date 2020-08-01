pipeline {
  agent {
    dockerfile {
      filename 'Dockerfile'
      dir 'core'
    }

  }
  stages {
    stage('Build') {
      agent {
        dockerfile {
          filename 'Dockerfile'
          dir 'core'
        }

      }
      steps {
        sh 'echo OK'
      }
    }

  }
} 
