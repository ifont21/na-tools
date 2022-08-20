FROM ubuntu/nginx:1.18-22.04_beta

COPY nginx.conf /etc/nginx/nginx.conf

COPY ./dist/apps/transformation-tooling /usr/share/nginx/html
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
