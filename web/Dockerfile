FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:1.21.0-alpine

COPY --from=build /app/nginx/ngnix.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/nginx/nginx-crt.pem /home/nginx-crt.pem
COPY --from=build /app/nginx/nginx-key.pem /home/nginx-key.pem

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 443

CMD ["nginx", "-g", "daemon off;"]
