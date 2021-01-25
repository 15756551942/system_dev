FROM nginx:alpine
MAINTAINER lance "lance10030@163.com"
RUN git pull && npm run build
ADD build /usr/share/nginx/html
ADD nginx.conf /etc/nginx/conf.d/default.conf
