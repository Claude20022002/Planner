# Service de génération (Timefold).
# Cible « parcours » : JAR déjà produit hors Docker (CI, évite 429 Maven dans BuildKit).
# Cible par défaut (dernière) : build Maven multi-stage pour la publication.

FROM eclipse-temurin:21-jre-alpine AS execution
WORKDIR /app
RUN addgroup -S solver && adduser -S solver -G solver
EXPOSE 8080
# Mémoire bornée : le modèle (créneau + salle à choisir) reste petit
ENV JAVA_OPTS="-XX:MaxRAMPercentage=75"
HEALTHCHECK --interval=15s --timeout=5s --retries=5 CMD wget -qO- http://localhost:8080/health || exit 1
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]

# Parcours CI : le JAR vient du contexte (mvn package sur le runner)
FROM execution AS parcours
COPY --chown=solver:solver target/hestim-solver.jar app.jar
USER solver

FROM maven:3.9-eclipse-temurin-21 AS build
WORKDIR /app
COPY pom.xml .
RUN --mount=type=cache,target=/root/.m2 \
    mvn -B -ntp -Dmaven.wagon.http.retryHandler.count=5 dependency:go-offline
COPY src ./src
RUN --mount=type=cache,target=/root/.m2 \
    mvn -B -ntp -Dmaven.wagon.http.retryHandler.count=5 package -DskipTests

# Production (cible par défaut) : JAR issu de l'étape Maven
FROM execution
COPY --from=build --chown=solver:solver /app/target/hestim-solver.jar app.jar
USER solver
