FROM node:18-alpine as builder
WORKDIR /next/app
COPY package.json ./
COPY yarn.lock ./
RUN yarn
COPY . .
RUN yarn build

# production environment
FROM nginx:stable-alpine
COPY --from=builder /next/app/out /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d
ENV TZ=Asia/Ulaanbaatar
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]