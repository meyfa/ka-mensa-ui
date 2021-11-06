# build
FROM node:lts-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . ./
RUN npm run build

# production
FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY --from=build /app/docker-nginx-template.conf /
ENV API_ENDPOINT=""
ENV PRIVACY_POLICY_URL=""
CMD ["/bin/sh" , "-c" , "envsubst < /docker-nginx-template.conf > /etc/nginx/conf.d/default.conf && exec nginx -g 'daemon off;'"]
EXPOSE 80
