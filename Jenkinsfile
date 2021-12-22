def builderImages
def dockername = "rizkazn15/backenddev:dev"

pipeline {
    agent any

    parameters {
        booleanParam(name: "RELEASE", defaultValue: false)
    }

    stages {
        stage('Install dependencies') {
            steps {
                nodejs("node-v14") {
                    sh 'npm install'
                }
            }
        }
        stage('Runn Test') {
            steps {
                nodejs("node-v14") {
                    sh 'npm test'
                }
            }
        }
        stage('Build Image') {
            steps {
                script {
                    builderImages = docker.build("${dockername}")
                }
            }
        }
        stage('Test Image') {
            steps {
                script {
                    builderImages.inside {
                        sh "echo pass"
                    }
                }
            }
        }
        stage('Push Image') {
            steps {
                script {
                    builderImages.push()
                }
            }
        }

        stage('Running Image') {
            steps {
                sh "cd /var/lib/jenkins/workspace/backend_deploy ; docker-compose up -d"
                }
        }


        // stage('Remove Unused Docker Image') {
        //     steps{
        //         sh "docker rmi $dockername"
        //     }
        // }

        // stage('Deployment') {
        //     when {
        //         expression {
        //             params.RELEASE
        //         }
        //     }
        //     steps {
        //         script {
        //             sshPublisher(
        //                 publishers: [
        //                     sshPublisherDesc(
        //                         configName: 'develop',
        //                         verbose: false,
        //                         transfers: [
        //                             sshTransfer(
        //                                 execCommand: "docker pull ${dockername}; docker kill backend; docker run -d --rm --name backend -p 9000:9000 ${dockername}",
        //                                 execTimeout: 120000,
        //                             )
        //                         ]
        //                     )
        //                 ]
        //             )

        //         }
        //     }
        // }
    }
}