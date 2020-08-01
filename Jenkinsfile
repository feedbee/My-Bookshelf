pipeline {
  agent {
    dockerfile {
      filename 'Dockerfile'
      dir 'core'
      args '--entrypoint=""'
    }
  }
  
  stages {
    stage('Build') {
      steps {
        sh 'echo OK'
      }
    }
  }
} 
