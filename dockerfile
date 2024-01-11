# Use a imagem oficial do Node.js
FROM node:20

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /usr/src/app

# Copie os arquivos de dependências do projeto para o contêiner
COPY package*.json ./

# Instale as dependências
RUN yarn install

# Copie o restante dos arquivos para o contêiner
COPY . .

# Exponha a porta em que a aplicação estará em execução
EXPOSE 5000

CMD ["yarn", "start"]