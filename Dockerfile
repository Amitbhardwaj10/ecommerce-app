# Build Stage
FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /app

# Copy backend files
COPY backend/ .

# Make mvnw executable
RUN chmod +x ./mvnw

# Build using Maven wrapper
RUN ./mvnw clean package -DskipTests

# Run Stage
FROM eclipse-temurin:21-jdk
WORKDIR /app
COPY --from=build /app/target/backend-0.0.1-SNAPSHOT.jar backend.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "backend.jar"]