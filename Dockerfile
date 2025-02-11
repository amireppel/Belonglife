FROM node:20-alpine AS build_image

WORKDIR /app/react-app-blife

COPY package.json .
RUN npm i

COPY . .

## EXPOSE [Port you mentioned in the vite.config file]


RUN npm run build

FROM node:20-alpine AS production_image

WORKDIR /app/react-app-blife

COPY --from=build_image /app/react-app-blife/dist/ /app/react-app-blife/dist/

COPY package.json .
COPY vite.config.ts .

RUN npm install typescript

EXPOSE 3001

CMD ["npm", "run", "preview"]
