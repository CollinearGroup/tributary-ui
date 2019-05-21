FROM nginx:1.15
RUN mkdir /var/www
COPY ./build /var/www
COPY docker_deploy/nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
ENTRYPOINT ["nginx","-g","daemon off;"]
