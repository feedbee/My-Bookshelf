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
          args '--entrypoint=""'
        }

      }
      steps {
        sh 'echo OK'
      }
    }

  }
} 
