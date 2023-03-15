pipeline {
  agent { label 'linux' }

  options {
    disableConcurrentBuilds()
    /* Necessary for logos-side-builder local_folder source type. */
    checkoutToSubdirectory('src')
    /* manage how many builds we keep */
    buildDiscarder(logRotator(
      numToKeepStr: '20',
      daysToKeepStr: '30',
    ))
  }

  environment {
    /* Mode of logos-site-builder for copying site source from already checked out repo.
     * TODO: Avoid copying anything at all, make checkout site of into `docs` folder work. */
    CONTENT_SOURCE_TYPE  = 'local_folder'
    CONTENT_SOURCE_URL = '../src'
    GIT_COMMITTER_NAME = 'status-im-auto'
    GIT_COMMITTER_EMAIL = 'auto@status.im'
    /* dev page settings */
    DEV_SITE = 'dev.vac.dev'
    DEV_HOST = 'jenkins@node-01.do-ams3.sites.misc.statusim.net'
    SCP_OPTS = 'StrictHostKeyChecking=no'
  }

  stages {
    stage('Clone Builder') {
      steps {
        dir('builder') {
          checkout([$class: 'GitSCM',
            branches: [[name: 'v0']],
            userRemoteConfigs: [[url: 'https://github.com/acid-info/logos-site-builder']]])
        }
      }
    }

    stage('Install') {
      steps {
        dir('builder') {
           sh 'yarn install'
        }
      }
    }

    stage('Build') {
      steps {
        dir('builder') {
           sh 'yarn build'
        }
      }
    }

    stage('Publish Prod') {
      when { expression { env.GIT_BRANCH ==~ /.*master/ } }
      steps {
        dir('src') {
          sh 'cp -r ../builder/out ./'
          sshagent(credentials: ['status-im-auto-ssh']) {
            sh "ghp-import -p out"
          }
        }
      }
    }

    stage('Publish Devel') {
      when { expression { env.GIT_BRANCH ==~ /.*develop/ } }
      steps {
        dir('builder') {
          sshagent(credentials: ['jenkins-ssh']) {
            sh """
              rsync -e 'ssh -o ${SCP_OPTS}' -r --delete out/. \
                ${env.DEV_HOST}:/var/www/${env.DEV_SITE}/
            """
          }
        }
      }
    }
  }

  post {
    cleanup { cleanWs() }
  }
}
