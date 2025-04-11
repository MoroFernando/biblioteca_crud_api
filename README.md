# 📚 Exp Criativa - Biblioteca CRUD API

Uma API RESTful feita em **Node.js + TypeScript** com **Prisma ORM** e **MySQL** para gerenciar livros, autores, categorias, membros e empréstimos.

---

## 🚀 Tecnologias

- Node.js
- TypeScript
- Express
- Prisma ORM
- MySQL

---

## 📦 Requisitos

- Node.js (v18 ou superior)
- MySQL rodando localmente ou em servidor
- Yarn ou NPM

---

## 🔧 Instalação

1. **Clone o repositório**

```bash
git clone https://github.com/seu-usuario/biblioteca-crud.git
cd biblioteca-crud
```

2. **Instale as dependências**

```bash
npm install
```

3. **Configure o banco de dados**

Crie um banco no MySQL e copie o .env.example:
```bash
cp .env.example .env
```

Edite o arquivo .env com sua conexão MySQL:
```bash
DATABASE_URL="mysql://usuario:senha@localhost:3306/nome_do_banco"
```

4. **Gere as tabelas com Prisma**

Esse comando:
 - Cria as tabelas no banco de dados
 - Gera o client do Prisma

```bash
npx prisma migrate dev --name init
```

5. **Rode o servidor**

```bash
npm run dev
```
