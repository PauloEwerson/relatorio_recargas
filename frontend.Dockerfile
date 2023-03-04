# Use a imagem base do Node.js
FROM node:16-alpine

# Define o diretório de trabalho no container
WORKDIR /usr/src/app/frontend

# Copia arquivos package.json e package-lock.json para o container
COPY frontend/package*.json ./

# Instala as dependências do Node.js
RUN npm install

# Copia os arquivos restantes do projeto para o container
COPY . .

# Expõe a porta 3000 do container para a porta 3000 do host
EXPOSE 3000

# Define a variável de ambiente para conexão com banco de dados MySQL
ENV MYSQL_HOST=localhost
ENV MYSQL_USER=root
ENV MYSQL_PASSWORD=root
ENV MYSQL_DB=recargas

# Define o comando para iniciar o servidor Node.js
CMD ["npm", "start"]
