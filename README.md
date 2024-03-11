# EXPENSES APP

APP responsável para gerenciamento de despesas

## Funcionalidades

- Gerenciar Usuários
- Gerenciar Despesas

## Tecnologias

- NodeJS ([Express](https://expressjs.com/))
- MySQL ([typeorm](https://typeorm.io/))
- npm
- Docker

## Rodando localmente

Clone o projeto

```bash
  git clone git@github.com:rbraga23/expenses-app.git
```

Entre no diretório do projeto

```bash
  cd expense-app
```

Instale as dependências

```bash
  npm install
```

Configure o banco de dados, crie 2 schemas, um para teste e outro para produção, sujestao de nomes: expenses_app e expenses_app_test

Configure as variaveis de ambiente de produção e testes

Arquivo .env

```bash
  PORT=
  DB_USER=
  DB_PASS=
  DB_NAME=
  DB_HOST=
  DB_PORT=
  RESEND_API_KEY=
  RESEND_FROM_EMAIL=
```

Arquivo .env.test

```bash
  DB_USER=
  DB_PASS=
  DB_NAME=
  DB_HOST=
  DB_PORT=
```

Rode as migrations e seeds para popular o banco de dados

```bash
  npm run prepare
```

Inicie as aplicações, existem duas formas, pod optar por por rodar manualmente ou utilizar o docker

Forma manual

```bash
  npm run dev
```

Utilizando docker

```bash
  docker compose up
```

Caso preficar rodar cada container individualmente

```bash
  docker compose up <nome_do_serviço>
```

Executar testes

```bash
  npm run test
```

Executar testes indiviualmente

```bash
  npm run test <testCase1> <TestCase2>
```
