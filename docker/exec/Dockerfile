FROM alpine:3.7

ENV UID=791
ENV GID=791
ENV USER=listen
ENV GROUP=listen

VOLUME /listen
WORKDIR /listen

RUN set -xe \
    && apk add --no-cache -U su-exec php7 git zip unzip mariadb-client curl wget ca-certificates openssl bash nodejs-npm gnupg sudo acl \
    && apk add --no-cache -U php7-common php7-mbstring php7-gd php7-intl php7-iconv php7-json php7-dom php7-ctype php7-xml php7-posix php7-session php7-tokenizer php7-fileinfo php7-pdo_mysql php7-phar php7-curl php7-simplexml php7-xmlwriter php7-zip
RUN set -xe && apk add --no-cache yarn
RUN set -xe && npm install -g @angular/cli
RUN set -xe && ng set --global packageManager=yarn

COPY run.sh /usr/local/bin/run.sh
RUN chmod +x /usr/local/bin/run.sh

ENTRYPOINT ["run.sh"]
