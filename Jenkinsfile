def builderImages
def dockername = "rizkazn15/backenddev:dev"

pipeline {
    agent any

    stages {
        stage('Install dependencies') {
            when {
                changeset "package.json"
            }
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
        stage('Deployment') {
            steps {
                script {
                    sshPublisher(
                        publishers: [
                            sshPublisherDesc(
                                configName: 'develop',
                                verbose: false,
                                transfers: [
                                    sshTransfer(
                                        execCommand: "docker pull ${dockername}; docker kill backend; docker run -d --rm --name backend --net dockernetwork -p 9000:9000 ${dockername}",
                                        execTimeout: 120000,
                                    )
                                ]
                            )
                        ]
                    )

                }
            }
        }
    }
}