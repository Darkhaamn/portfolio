FROM mhart/alpine-node:14 as builder
WORKDIR /next/app
ENV HUSKY_SKIP_INSTALL=1
COPY package.json ./
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