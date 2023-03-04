FROM node:16-alpine

# Create app directory
WORKDIR /usr/src/app/backend

# Install app dependencies
COPY backend/package*.json ./

# Instala e garante que as versões das dependências sejam as mesmas em todos os ambientes
RUN npm ci

# Bundle app source
COPY . .

EXPOSE 3001
CMD [ "npm", "run", "debug" ]
