FROM node:16-alpine
ENV ENV_NAME = codepoint
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --save-dev typescript @types/react
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
 