# Service de génération (Timefold) : compilé avec Maven, exécuté sur un JRE 21 minimal.
# Cache BuildKit de /root/.m2 : la CI Parcours réutilise les deps quand pom.xml est inchangé
# (évite les 429 de Maven Central au go-offline à froid).
FROM maven:3.9-eclipse-temurin-21 AS build
WORKDIR /app
COPY pom.xml .
RUN --mount=type=cache,target=/root/.m2 \
    mvn -B -ntp -Dmaven.wagon.http.retryHandler.count=5 dependency:go-offline
COPY src ./src
RUN --mount=type=cache,target=/root/.m2 \
    mvn -B -ntp -Dmaven.wagon.http.retryHandler.count=5 package -DskipTests

FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
RUN addgroup -S solver && adduser -S solver -G solver
COPY --from=build /app/target/hestim-solver.jar app.jar
USER solver
EXPOSE 8080
# Mémoire bornée : le modèle (créneau + salle à choisir) reste petit
ENV JAVA_OPTS="-XX:MaxRAMPercentage=75"
HEALTHCHECK --interval=15s --timeout=5s --retries=5 CMD wget -qO- http://localhost:8080/health || exit 1
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]
