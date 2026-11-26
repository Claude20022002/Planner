# ── Stage 1 : build Vite ─────────────────────────────────────────────────────
# node:22-bookworm-slim (Debian) — profil CVE différent d'Alpine, pas de CVE high connu
FROM node:22-bookworm-slim AS builder
WORKDIR /app

# Patcher les packages Debian avant toute chose
RUN apt-get update && apt-get upgrade -y --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
RUN npm ci

COPY . .
# Logique et jetons partagés avec le mobile (contexte « shared » de docker-compose) : /app/../shared
COPY --from=shared . /shared

# L'URL de l'API en prod : Nginx proxifie /api → backend:5000
# Pour un domaine séparé : --build-arg VITE_API_URL=https://api.mondomaine.com/api
ARG VITE_API_URL=/api
ENV VITE_API_URL=$VITE_API_URL

RUN npm run build

# Qualité 6 : défaut de ngx_brotli. index.html n'est pas ici : il est compressé à la volée.
RUN node --input-type=module -e 'import{readdir,readFile,writeFile}from"node:fs/promises";import{join}from"node:path";import{brotliCompressSync,constants}from"node:zlib";const params={[constants.BROTLI_PARAM_QUALITY]:6};async function marcher(dossier){for(const entree of await readdir(dossier,{withFileTypes:true})){const chemin=join(dossier,entree.name);if(entree.isDirectory())await marcher(chemin);else if(/\.(js|css|svg|json|xml)$/.test(entree.name)){const octets=await readFile(chemin);if(octets.length>0)await writeFile(chemin+".br",brotliCompressSync(octets,{params}));}}}await marcher("dist/assets");'

# ── Stage 2 : module brotli, même version nginx que l'image finale ───────────
FROM nginx:1.27-alpine AS brotli
ARG NGX_BROTLI_COMMIT=53e0fb55f250f48fe80c0ddbf6c0f7103cdbaae1
# Même ligne de compilation que nginx:1.27-alpine (nginx -V), plus le module.
# Pas de -march=native : l'image doit tourner ailleurs que sur le poste qui la construit.
RUN apk add --no-cache --virtual .build-deps \
      gcc g++ libc-dev make cmake openssl-dev pcre2-dev zlib-dev linux-headers git \
    && git clone https://github.com/google/ngx_brotli.git /tmp/ngx_brotli \
    && git -C /tmp/ngx_brotli checkout "$NGX_BROTLI_COMMIT" \
    && git -C /tmp/ngx_brotli submodule update --init --recursive \
    && cd /tmp/ngx_brotli/deps/brotli \
    && mkdir out && cd out \
    && cmake -DCMAKE_BUILD_TYPE=Release -DBUILD_SHARED_LIBS=OFF -DCMAKE_POSITION_INDEPENDENT_CODE=ON .. \
    && cmake --build . --config Release --target brotlienc \
    && wget -O /tmp/nginx.tar.gz "https://nginx.org/download/nginx-${NGINX_VERSION}.tar.gz" \
    && tar -xzf /tmp/nginx.tar.gz -C /tmp \
    && cd "/tmp/nginx-${NGINX_VERSION}" \
    && ./configure \
        --prefix=/etc/nginx \
        --sbin-path=/usr/sbin/nginx \
        --modules-path=/usr/lib/nginx/modules \
        --conf-path=/etc/nginx/nginx.conf \
        --error-log-path=/var/log/nginx/error.log \
        --http-log-path=/var/log/nginx/access.log \
        --pid-path=/run/nginx.pid \
        --lock-path=/run/nginx.lock \
        --http-client-body-temp-path=/var/cache/nginx/client_temp \
        --http-proxy-temp-path=/var/cache/nginx/proxy_temp \
        --http-fastcgi-temp-path=/var/cache/nginx/fastcgi_temp \
        --http-uwsgi-temp-path=/var/cache/nginx/uwsgi_temp \
        --http-scgi-temp-path=/var/cache/nginx/scgi_temp \
        --with-perl_modules_path=/usr/lib/perl5/vendor_perl \
        --user=nginx --group=nginx \
        --with-compat --with-file-aio --with-threads \
        --with-http_addition_module --with-http_auth_request_module \
        --with-http_dav_module --with-http_flv_module --with-http_gunzip_module \
        --with-http_gzip_static_module --with-http_mp4_module \
        --with-http_random_index_module --with-http_realip_module \
        --with-http_secure_link_module --with-http_slice_module \
        --with-http_ssl_module --with-http_stub_status_module \
        --with-http_sub_module --with-http_v2_module --with-http_v3_module \
        --with-mail --with-mail_ssl_module \
        --with-stream --with-stream_realip_module \
        --with-stream_ssl_module --with-stream_ssl_preread_module \
        --with-cc-opt='-Os -fstack-clash-protection -Wformat -Werror=format-security -fno-plt -g' \
        --with-ld-opt='-Wl,--as-needed,-O1,--sort-common -Wl,-z,pack-relative-relocs' \
        --add-dynamic-module=/tmp/ngx_brotli \
    && make modules \
    && mkdir -p /out \
    && cp objs/ngx_http_brotli_filter_module.so objs/ngx_http_brotli_static_module.so /out/

# ── Stage 3 : Nginx sécurisé ─────────────────────────────────────────────────
FROM nginx:1.27-alpine
LABEL maintainer="HESTIM Planner" \
      description="Frontend React/Vite servi par Nginx"

# Patcher les CVEs Alpine
RUN apk upgrade --no-cache

# Copier le build Vite, la config Nginx et le module brotli (chargé dans le fichier principal)
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=brotli /out/ngx_http_brotli_filter_module.so /usr/lib/nginx/modules/ngx_http_brotli_filter_module.so
COPY --from=brotli /out/ngx_http_brotli_static_module.so /usr/lib/nginx/modules/ngx_http_brotli_static_module.so
RUN printf '%s\n' \
      'load_module /usr/lib/nginx/modules/ngx_http_brotli_filter_module.so;' \
      'load_module /usr/lib/nginx/modules/ngx_http_brotli_static_module.so;' \
      | cat - /etc/nginx/nginx.conf > /tmp/nginx.conf \
    && mv /tmp/nginx.conf /etc/nginx/nginx.conf

# Commit du site, lu par la commande de mise en ligne (lot ME-0b) : passé par la CI, « inconnue » sinon
ARG VERSION_PLANNER=inconnue
RUN echo "$VERSION_PLANNER" > /usr/share/nginx/html/version.txt

# Réduire les permissions sur les fichiers statiques
RUN chown -R nginx:nginx /usr/share/nginx/html && chmod -R 755 /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
