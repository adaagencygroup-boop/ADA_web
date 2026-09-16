FROM eclipse-temurin:25-jdk AS builder
WORKDIR /build
RUN apt-get update && apt-get install -y --no-install-recommends maven && rm -rf /var/lib/apt/lists/*
COPY pom.xml ./
RUN mvn dependency:go-offline -B || true
COPY src src
RUN mvn package -DskipTests
FROM eclipse-temurin:25-jre
WORKDIR /app
LABEL org.opencontainers.image.source="https://github.com/adaagencygroup-boop/ADA_web"
RUN apt-get update && apt-get install -y --no-install-recommends postgresql-client && rm -rf /var/lib/apt/lists/*
COPY --from=builder /build/target/*.jar app.jar
RUN mkdir -p /var/app/storage/news /var/app/storage/recruitments /var/app/storage/contacts /var/app/storage/resumes /var/app/storage/media /var/app/storage/backups
EXPOSE 8080
ENTRYPOINT ["/bin/sh", "-c", "mkdir -p /var/app/storage/news /var/app/storage/recruitments /var/app/storage/contacts /var/app/storage/resumes /var/app/storage/media /var/app/storage/backups && chmod -R 777 /var/app/storage && exec java -Xms256m -Xmx512m -XX:+UseG1GC -XX:MaxMetaspaceSize=160m -Djdk.virtualThreadScheduler.parallelism=2 --enable-preview -jar app.jar"]