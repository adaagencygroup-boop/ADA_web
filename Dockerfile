FROM eclipse-temurin:25-jdk AS builder
WORKDIR /build
RUN apt-get update && apt-get install -y --no-install-recommends maven && rm -rf /var/lib/apt/lists/*
COPY pom.xml ./
RUN mvn dependency:go-offline -B || true
COPY src src
RUN mvn clean test
RUN mvn package -DskipTests
FROM eclipse-temurin:25-jre
WORKDIR /app
RUN apt-get update && apt-get install -y --no-install-recommends postgresql-client && rm -rf /var/lib/apt/lists/*
COPY --from=builder /build/target/*.jar app.jar
RUN mkdir -p /var/app/storage/news /var/app/storage/recruitments /var/app/storage/contacts /var/app/storage/resumes /var/app/storage/media /var/app/storage/backups
EXPOSE 8080
ENTRYPOINT ["java", "-Xms512m", "-Xmx1536m", "-XX:+UseG1GC", "-XX:MaxMetaspaceSize=256m", "-Djdk.virtualThreadScheduler.parallelism=4", "--enable-preview", "-jar", "app.jar"]