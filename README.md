# Sumário

- [Configuração da Máquina](#configuração-da-máquina)
- [Variáveis de Ambiente](#variáveis-de-ambiente)
- [Instalação das Bibliotecas](#instalacao-das-bibliotecas)
- [Configurando o Banco](#configurando-o-banco)
- [Comandos do projeto](#comandos-do-projeto)
- [Links](#links)

# Configuração da Máquina

## Atualização da máquina

```sh
sudo apt update
sudo apt upgrade
```

## Ferramentas necessárias

A nossa aplicação vai usa NodeJS + Docker + Docker-Compose, além disso nós precisamos buscar o nosso código no repositório Git. Abaixo estão todos os programas que devem ser instalados:

```sh
# Git
sudo apt install git

# NodeJS
sudo apt install nodejs

# NPM
sudo apt install npm

# Docker + Docker Compose
sudo apt install docker-compose
```

## Configuração do Grupo de Usuário do Docker

O Docker precisa ser adicionado a um grupo de usuário para rodar.

```sh
# Adição do grupo
sudo groupadd docker
sudo gpasswd -a $USER docker

# Atualização status
newgrp docker
```

## Configuração do VSCode

Recomenda-se a instalação dos seguintes plugins do VSCode:

- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [Git Graph](https://marketplace.visualstudio.com/items?itemName=mhutchie.git-graph)
- [Material Icon Theme](https://marketplace.visualstudio.com/items?itemName=PKief.material-icon-theme)<small><sup>1</sup></small>

> <small><sup>1</sup> Opcional</small>

## Outras ferramentas

- Postman
- Dbeaver

# Variáveis de Ambiente

Para configurar o seu ambiente é necessário que as variáveis abaixo sejam declaradas em um arquivo `.env` na raíz do projeto ou diretamente na máquina que está rodando a aplicação. Troque `?` pelas devidas credenciais.

```sh
# APP
APP_NAME=[ENV]: Iracema
APP_VERSION=v1

# Server
NODE_ENV=development
PORT=3333

# Database connection
DB_HOST=localhost
DB_PORT=5432
DB_USER=root
DB_PASSWORD=root
DB_DATABASE=iracema-db

# Security
MIN_SALT=6
MAX_SALT=12
TOKEN_SECRET=12345
TOKEN_LIFE=1h
REFRESH_SECRET=12345
REFRESH_LIFE=1d

# Pagination
PAGE_SIZE=3
```

# Instalação das Bibliotecas

Instale as bibliotecas do projeto com o `npm`:

```sh
npm install
```

# Configurando o Banco

O banco deve ser configurado de acordo com a necessidade e seguindo a documentação disponível para o Knex. Assumindo que o banco está corretamente configurado, basta excutar os comandos abaixo dentro da pasta do projeto.

### Subindo o banco

```sh
# Start (Aqui o serviço do banco será inicializado)
docker-compose up -d db

# Stop containers (se necessário)
docker-compose down
```

### Criando as tabelas

No arquivo de variáveis `.env`, mude o `NODE_ENV=development`

```sh
# Criando as tabelas
npx knex migrate:latest

# Populando as bibliotecas por meio de Seeds
npx knex seed:run
```

### Criando uma nova migration

```sh
# Criando as tabelas
npx knex migrate:make nome_da_tabela
```

# Comandos do Projeto

```sh
# Execução
npm run dev

# Reset do banco
npm run reset-db
```