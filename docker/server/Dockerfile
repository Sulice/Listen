FROM alpine:3.7

ARG PHP_EXT
ENV UID=791 GID=791

COPY s6.d /etc/s6.d
COPY php7 /etc/php7
COPY run.sh /usr/local/bin/run.sh
COPY nginx /etc/nginx

RUN set -xe \
    && apk add --no-cache -U s6 su-exec ca-certificates nginx php7-fpm \
    && apk add --no-cache php7-common php7-json php7-fileinfo \
    && mkdir -p /php/logs /nginx/logs /nginx/tmp \
    && chmod -R +x /usr/local/bin /etc/s6.d /var/lib/nginx

VOLUME /www
VOLUME /www/music
EXPOSE 8080

CMD ["run.sh"]
