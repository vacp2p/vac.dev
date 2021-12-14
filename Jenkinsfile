pipeline {
  agent { label 'linux' }

  options {
    disableConcurrentBuilds()
    /* manage how many builds we keep */
    buildDiscarder(logRotator(
      numToKeepStr: '20',
      daysToKeepStr: '30',
    ))
  }

  environment {
    GH_USER = 'status-im-auto'
    GH_MAIL = 'auto@status.im'
    /* Dev site deployment. */
    DEV_SITE = 'dev.vac.dev'
    DEV_HOST = 'jenkins@node-01.do-ams3.sites.misc.statusim.net'
    SCP_OPTS = 'StrictHostKeyChecking=no'
    /* Avoid need for sudo when using bundler. */
    GEM_HOME = "${env.HOME}/.gem"
  }

  stages {
    stage('Git Prep') {
      steps {
        sh "git config user.name ${env.GH_USER}"
        sh "git config user.email ${env.GH_MAIL}"
        sh 'yarn run clean'
      }
    }

    stage('Install Deps') {
      steps {
        sh 'yarn install --ignore-optional'
        sh 'bundle install'
      }
    }

    stage('Build') {
      steps {
        sh 'yarn run build:production'
      }
    }

    stage('Publish Prod') {
      when { expression { env.GIT_BRANCH ==~ /.*master/ } }
      steps {
        sshagent(credentials: ['status-im-auto-ssh']) {
          sh 'yarn run deploy'
        }
      }
    }

    stage('Publish Devel') {
      when { expression { !(env.GIT_BRANCH ==~ /.*master/) } }
      steps {
        sshagent(credentials: ['jenkins-ssh']) {
          sh """
            rsync -e 'ssh -o ${SCP_OPTS}' -r --delete _site/. \
            ${env.DEV_HOST}:/var/www/${env.DEV_SITE}/
          """
        }
      }
    }
  }
}
