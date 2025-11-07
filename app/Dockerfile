# Usa uma imagem base do Node.js
FROM node:18

# Define o diretório de trabalho dentro do container
WORKDIR /usr/src/app

# Copia os arquivos do projeto para dentro do container
COPY package*.json ./
COPY server.js .

# Instala as dependências
RUN npm install express prom-client

# Expõe a porta 3000
EXPOSE 3000

# Comando padrão para iniciar o app
CMD ["node", "server.js"]
