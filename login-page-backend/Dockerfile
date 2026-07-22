FROM eclipse-temurin:25-jdk AS builder

WORKDIR /app

COPY . .

RUN chmod +x mvnw
RUN  ./mvnw clean package -DskipTests

FROM eclipse-temruin:25-jre

WORKDIR /app

COPY --from=builder /app/target/login-page-backend-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]