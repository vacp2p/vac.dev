#!/usr/bin/env groovy
library 'status-jenkins-lib@v1.9.24'

pipeline {
  agent {
    docker {
      label 'linuxcontainer'
      image 'harbor.status.im/infra/ci-build-containers:linux-base-1.0.0'
      args '--volume=/nix:/nix ' +
           '--volume=/etc/nix:/etc/nix '
    }
  }

  options {
    disableConcurrentBuilds()
    /* manage how many builds we keep */
    buildDiscarder(logRotator(
      numToKeepStr: '20',
      daysToKeepStr: '30',
    ))
  }

  environment {
    GIT_COMMITTER_NAME = 'status-im-auto'
    GIT_COMMITTER_EMAIL = 'auto@status.im'
  }

  stages {
    stage('Install') {
      steps {
        script {
          nix.develop('yarn install')
        }
      }
    }

    stage('Build') {
      steps {
        script {
          nix.develop('yarn build')
          jenkins.genBuildMetaJSON('build/build.json')
        }
      }
    }

    stage('Publish') {
      steps {
        sshagent(credentials: ['status-im-auto-ssh']) {
          script {
            nix.develop("""
              ghp-import \
                -b ${deployBranch()} \
                -c ${deployDomain()} \
                -p build
            """, sandbox: false,
                 keepEnv: ['SSH_AUTH_SOCK'])
          }
         }
      }
    }
  }

  post {
    cleanup { cleanWs() }
  }
}

def isMasterBranch() { GIT_BRANCH ==~ /.*master/ }
def deployBranch() { isMasterBranch() ? 'deploy-master' : 'deploy-develop' }
def deployDomain() { isMasterBranch() ? 'vac.dev' : 'dev.vac.dev' }
