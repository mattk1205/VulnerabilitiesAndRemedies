FROM maven:3.6.3-jdk-8

WORKDIR /app

COPY pom.xml .

EXPOSE 8080

RUN mvn dependency:go-offline

CMD [ "mvn", "spring-boot:run" ]