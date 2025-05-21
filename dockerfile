# build stage
FROM node:18-alpine AS build
WORKDIR /app
COPY frontend/package*.json ./
RUN npm ci
COPY frontend/ .
RUN npm run build

# serve stage
FROM nginx:stable-alpine
# remove configuração default
RUN rm -rf /usr/share/nginx/html/*
# copia build estático
COPY --from=build /app/dist /usr/share/nginx/html
# copia uma conf nginx mínima
COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]