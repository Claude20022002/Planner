# Assemble l'image Nginx à partir du même dist/ que l'artefact de CI.
FROM python:3.13-alpine AS politique
WORKDIR /construction
COPY nginx/generer-csp.py .
COPY dist/ dist/
RUN python generer-csp.py dist > csp.conf

FROM nginx:alpine
COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=politique /construction/csp.conf /etc/nginx/csp.conf
COPY dist/ /srv/vitrine/
COPY nginx/robots.txt /srv/vitrine/robots.txt
EXPOSE 8080
USER nginx
