FROM node:alpine as build-stage

WORKDIR /client-web

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY ./ .
RUN yarn run build


FROM nginx:alpine as serve-stage

COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build-stage /client-web/dist /client-web

