FROM nginx:alpine
MAINTAINER lance "lance10030@163.com"
ADD build /usr/share/nginx/html
ADD nginx.conf /etc/nginx/conf.d/default.conf
