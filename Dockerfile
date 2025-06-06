FROM node:20.11.1-alpine3.19 as builder

RUN mkdir "/tmp/dist"
WORKDIR /tmp

# for yarn berry
COPY .yarn/releases/ .yarn/releases
COPY .yarnrc.yml ./.yarnrc.yml
COPY yarn.lock yarn.lock
COPY package.json yarn.lock ./

RUN yarn install --immutable

COPY src src
COPY public public
COPY index.html index.html
COPY tsconfig.json tsconfig.json
COPY tsconfig.node.json tsconfig.node.json
COPY .eslintrc.cjs .eslintrc.cjs
COPY vite.config.ts vite.config.ts
COPY .env .env

RUN yarn build

FROM nginx:1.24.0-alpine

EXPOSE 80

COPY --from=builder /tmp/dist /usr/share/nginx/html/dist
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY ./nginx/conf.d/site.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]
