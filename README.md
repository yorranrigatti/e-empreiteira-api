# Documentação da API

## Tabela de Conteúdos

[Visão Geral](#1-visão-geral)

---

## 1. Visão Geral

Visão geral do projeto, um pouco das tecnologias usadas.

- [NodeJS](https://nodejs.org/en/)
- [Express](https://expressjs.com/pt-br/)
- [TypeScript](https://www.typescriptlang.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [TypeORM](https://typeorm.io/)
- [Yup](https://www.npmjs.com/package/yup)

A URL base da aplicação:
http://localhost:3000

---

## 2. Diagrama ER

[ Voltar para o topo ](#tabela-de-conteúdos)

Diagrama ER da API definindo bem as relações entre as tabelas do banco de dados.

![DER1](der1.png)
![DER2](der2.png)

---

## 3. Início Rápido

[ Voltar para o topo ](#tabela-de-conteúdos)

### 3.1. Instalando Dependências

Clone o projeto em sua máquina e instale as dependências com o comando:

```shell
yarn
```

### 3.2. Variáveis de Ambiente

Em seguida, crie um arquivo **.env**, copiando o formato do arquivo **.env.example**:

```
cp .env.example .env
```

Configure suas variáveis de ambiente com suas credenciais do Postgres e uma nova database da sua escolha.

### 3.3. Migrations

Execute as migrations com o comando:

```
yarn typeorm migration:run -d src/data-source.ts
```

---

## 4. Autenticação

[ Voltar para o topo ](#tabela-de-conteúdos)

Por enquanto, não foi implementada autenticação.

---

## 5. Endpoints

[ Voltar para o topo ](#tabela-de-conteúdos)

- [Clients](#1-clients)
  - [POST - /clients](#11-criação-de-cliente)
  - [GET - /clients](#12-listando-clientes)
- [Sessions](#2-Sessions)
  - [POST - /sessions](#21-login-de-cliente)

---

## 1. **Clients**

[ Voltar para os Endpoints ](#5-endpoints)

O objeto Client é definido como:

| Campo    | Tipo   | Descrição                      |
| -------- | ------ | ------------------------------ |
| id       | string | Identificador único do usuário |
| name     | string | O primeiro nome do usuário.    |
| lastName | string | O sobrenome do usuário.        |
| email    | string | O e-mail do usuário.           |
| password | string | A senha de acesso do usuário   |

### Endpoints

| Método   | Rota       | Descrição                               |
|----------|------------|-----------------------------------------|
| POST     | /clients     | Criação de um usuário.                  |
| GET      | /clients     | Lista todos os usuários                 |


--- 

### 1.1. **Criação de Usuário**

[ Voltar para os Endpoints ](#5-endpoints)

### `/clients`

### Exemplo de Request:
``` 
POST /clients
Host: http://localhost:3000
Authorization: None
Content-type: application/json
```

### Corpo da Requisição:
```json
{
	"name": "Yorran",
	"lastName": "Rodrigues",
	"email": "yorran@email.com",
	"password": "senhaForte"
}
```

### Schema de Validação com Yup:
```javascript
    name: yup.string().required("name is required"),
    lastName: yup.string().required("name is required"),
    email: yup.string().required("email is required"),
    password: yup.string().required("password is required"),
```
OBS.: Chaves não presentes no schema serão removidas.

### Exemplo de Response:
```
201 Created
```

```json
{
	"id": "0d841ce1-3d8f-4aa1-ad34-24528c8c8a91",
	"name": "Yorran",
	"lastName": "Rodrigues",
	"email": "yorran@email.com",
	"password": "$2a$08$xStHwkfZi2UzOW797eFJvudNmx7O2eTWq8ncwhBoKdwNhuZo0HOHS",
	"created_at": "2022-05-19T17:02:46.995Z",
	"updated_at": "2022-05-19T17:02:46.995Z"
}
```

### Possíveis Erros:
| Código do Erro | Descrição |
|----------------|-----------|
| 409 Conflict   | Email already registered. |

---
### 1.2. **Listando Usuários**

[ Voltar aos Endpoints ](#5-endpoints)

### `/clients`

### Exemplo de Request:
```
GET /clients
Host: http://localhost:3000
Authorization: JWS Token
Content-type: application/json
```

### Corpo da Requisição:
```json
Vazio
```

### Exemplo de Response:
```
200 OK
```
```json
[
	{
		"id": "0d841ce1-3d8f-4aa1-ad34-24528c8c8a91",
		"name": "Yorran",
		"lastName": "Rodrigues",
		"email": "yorran@email.com",
		"password": "$2a$08$xStHwkfZi2UzOW797eFJvudNmx7O2eTWq8ncwhBoKdwNhuZo0HOHS",
		"created_at": "2022-05-19T17:02:46.995Z",
		"updated_at": "2022-05-19T17:02:46.995Z"
	}
]
```

### Possíveis Erros:
Nenhum, o máximo que pode acontecer é retornar uma lista vazia.

---