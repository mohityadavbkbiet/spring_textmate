FROM amazoncorretto:17 AS builder
WORKDIR /app

# 1) Copy Maven wrapper & pom.xml for dependency caching
COPY .mvn/ .mvn/
COPY mvnw pom.xml ./

# 2) Ensure wrapper is executable & pre-fetch dependencies
RUN chmod +x mvnw && ./mvnw dependency:go-offline

# 3) Copy application source and build the jar
COPY src ./src
RUN ./mvnw clean package -DskipTests

# 4) Prepare runtime image
FROM amazoncorretto:17
WORKDIR /app

# Copy built jar from builder stage
COPY --from=builder /app/target/*.jar app.jar

# Expose application port
EXPOSE 8000

# Run the Spring Boot application
ENTRYPOINT ["java", "-jar", "app.jar"]