pipeline {
  agent {
    dockerfile {
      filename 'core/Dockerfile'
      dir 'core'
    }

  }
  stages {
    stage('Build') {
      agent {
        dockerfile {
          filename 'core/Dockerfile'
          dir 'core'
        }

      }
      steps {
        sh 'echo OK'
      }
    }

  }
} 
