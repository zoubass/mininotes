FROM openjdk:8-jdk-alpine
COPY build/libs/mininotes-0.0.1-SNAPSHOT.jar /mininotes.jar
VOLUME /tmp
ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/mininotes.jar"]
EXPOSE 8080