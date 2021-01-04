# Locadora Backend Project

Projeto feito em NodeJS com Typescript e usando MySQL como banco de dados. Os dados sensíveis são **protegidos** com **criptografia AES**.

## Guia
* [Instalação e uso](#instalação-e-uso)
* [Tecnologias](#tecnologias)
* [Endpoints](#endpoints)
	* [Usuário](#user)
	* [Categoria](#category)
	* [Diretor](#director)
	* [Filmes](#movie)
* [Criptografia](#criptografia-avançada-(AES))
* [MER do BD](#modelo-entidade-relacionamento-(MER))

## Tecnologias
  - [MySQL 8](https://dev.mysql.com/doc/relnotes/mysql/8.0/en/) - Banco de dados
  - [Typescript](https://www.typescriptlang.org/) - Linguagem (Javascript com tipagem)
  - [TypeORM](https://typeorm.io/#/) - ORM
  - [ExpressJS](https://expressjs.com/pt-br/) - Servidor

## EndPoints

- ### User: 

Registrar um usuário:

**OBS.:** Para fins de testes, todos os usuários estão sendo cadastrados como administradores. Você pode alterar essa configuração no arquivo [user.routes.ts](/src/routes/user.routes.ts), há uma comentário no método POST de registro contendo as informações para desativar esse recurso.

```http
POST /user/register/
```

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `name` | `string` | **requerido** |
| `email` | `string` | **requerido** |
| `password` | `string` | **requerido** |

**Response**

```javascript
{
  "isAdministrator" : bool,
  "id"    : number,
  "name" : string,
  "email": string,
  "updatedAt": timestamp,
  "createdAt": timestamp,
  "jwt": string
}
```
<p>&nbsp;</p>

Fazer login:

```http
POST /user/login/
```

| Body | Type | Description |
| :--- | :--- | :--- |
| `email` | `string` | **requerido** |
| `password` | `string` | **requerido** |

<p>&nbsp;</p>

**Response**

```javascript
{
  "isAdministrator" : bool,
  "id"    : number,
  "name" : string,
  "email": string,
  "updatedAt": date,
  "createdAt": date,
  "jwt": string
}
```
<p>&nbsp;</p>

Buscar dados de usuários:

```http
GET /user/:id? (opcional)
```

| Header | Type | Description |
| :--- | :--- | :--- |
| `Authorization` | `string` | **requerido**, formato: 'Bearer {token}'|

<p>&nbsp;</p>

**Response**
```javascript
{
  "isAdministrator" : bool,
  "id"    : number,
  "name" : string,
  "email": string,
  "updatedAt": date,
  "createdAt": date,
  "jwt": string
}
```

ou se você é um administrador e não passar o parâmetro id terá:
```javascript
[
{
  "isAdministrator" : bool,
  "id"    : number,
  "name" : string,
  "email": string,
  "updatedAt": date,
  "createdAt": date,
  "jwt": string
},
{
  "isAdministrator" : bool,
  "id"    : number,
  "name" : string,
  "email": string,
  "updatedAt": date,
  "createdAt": date,
  "jwt": string
},
...
]
```
<p>&nbsp;</p>


Atualizar dados do usuário:

```http
PUT /user/:id (requerido)
```
| Header | Type | Description |
| :--- | :--- | :--- |
| `Authorization` | `string` | **requerido**, formato: 'Bearer {token}'|

| Body | Type | Description |
| :--- | :--- | :--- |
| `name` | `string` | **opcional** |
| `email` | `string` | **opcional** |
| `password` | `string` | **opcional** |
| `isAdministrator` | `bool` | **opcional** (somente para administrador) |

**Response**
```javascript
{
  "isAdministrator" : bool,
  "id"    : number,
  "name" : string,
  "updatedAt": date,
  "createdAt": date
}
```

<p>&nbsp;</p>

Atualizar dados do usuário:

```http
DELETE /user/:id
```
| Header | Type | Description |
| :--- | :--- | :--- |
| `Authorization` | `string` | **requerido**, formato: 'Bearer {token}'|

**Response**
```javascript
{
  "isAdministrator" : bool,
  "id"    : number,
  "name" : string,
  "updatedAt": date,
  "createdAt": date
}
```
<p>&nbsp;</p>

- ### Category: 

Adicionar uma nova categoria:

```http
POST /category/
```
| Header | Type | Description |
| :--- | :--- | :--- |
| `Authorization` | `string` | **requerido**, formato: 'Bearer {token}'|

| Body | Type | Description |
| :--- | :--- | :--- |
| `description` | `string` | **requerido**, descrição da categoria, título |

**Response**
```javascript
{
  "id": number,
  "description": string
}
```
<p>&nbsp;</p>

Buscar uma ou todas as categorias:
```http
GET /category/:description (opcional)
```


**Response**
```javascript
{
  "id": number
  "description": string,
}
```

se você não passar o parâmetro description terá todas as categorias retornadas, exemplo:

```javascript
[
{
 "id": number,
  "description": string
},
{
 "id": number,
  "description": string
},
...
]
```

<p>&nbsp;</p>

Atualizar dados de uma categoria:

```http
PUT /category/:id (requerido)
```
| Header | Type | Description |
| :--- | :--- | :--- |
| `Authorization` | `string` | **requerido**, formato: 'Bearer {token}'|

| Body | Type | Description |
| :--- | :--- | :--- |
| `description` | `string` | **opcional**, descrição da categoria, título |

**Response**
```javascript
{
  "id": number
  "description": string,
}
```
<p>&nbsp;</p>

Deletar uma categoria:

```http
DELETE /category/:id (requerido)
```
| Header | Type | Description |
| :--- | :--- | :--- |
| `Authorization` | `string` | **requerido**, formato: 'Bearer {token}'|


**Response**
```javascript
{
  "id": number
  "description": string,
}
```

<p>&nbsp;</p>

- ### Director: 

Adicionar um novo diretor:

```http
POST /director/
```
| Header | Type | Description |
| :--- | :--- | :--- |
| `Authorization` | `string` | **requerido**, formato: 'Bearer {token}'|

| Body | Type | Description |
| :--- | :--- | :--- |
| `fullname` | `string` | **requerido**|

**Response**
```javascript
{
  "id": number
  "fullname": string,
  "updatedAt": date,
  "createdAt": date
}
```
<p>&nbsp;</p>

Buscar uma ou todos diretores:
```http
GET /director/:fullname (opcional)
```


**Response**
```javascript
{
  "id": number,
  "description": string,
  "updatedAt": date,
  "createdAt": date
}
```

se você não passar o parâmetro fullname terá todos os diretores retornados, exemplo:

```javascript
[
{
 "id": number,
  "fullname": string
},
{
 "id": number,
  "fullname": string
},
...
]
```

<p>&nbsp;</p>

Atualizar dados de um diretor:

```http
PUT /director/:id (requerido)
```
| Header | Type | Description |
| :--- | :--- | :--- |
| `Authorization` | `string` | **requerido**, formato: 'Bearer {token}'|

| Body | Type | Description |
| :--- | :--- | :--- |
| `fullname` | `string` | **opcional**|

**Response**
```javascript
{
  "id": number,
  "fullname": string,
  "updatedAt": date,
  "createdAt": date
}
```
<p>&nbsp;</p>

Deletar uma categoria:

```http
DELETE /director/:id (requerido)
```
| Header | Type | Description |
| :--- | :--- | :--- |
| `Authorization` | `string` | **requerido**, formato: 'Bearer {token}'|


**Response**
```javascript
{
  "id": number,
  "fullname": string,
  "updatedAt": date,
  "createdAt": date
}
```

<p>&nbsp;</p>

- ### Movie: 

Adicionar um novo filme:

```http
POST /movie/
```
| Header | Type | Description |
| :--- | :--- | :--- |
| `Authorization` | `string` | **requerido**, formato: 'Bearer {token}'|

| Body | Type | Description |
| :--- | :--- | :--- |
| `idCategory` | `number` | **requerido**, ID da categoria|
| `idDirector` | `number` | **requerido**, ID do Diretor |
| `amount` | `number` | **requerido**, quantidade de cópias disponíveis |
| `pictureUrl` | `string` | **opcional**, URL  da capa do filme|
| `description` | `string` | **requerido**, descrição ou sinopse do filme|
| `year` | number | **requerido**, ano de lançamento|

**Response**
```javascript
{
    "id": number,
    "idCategory": number,
    "idDirector": number,
    "pictureUrl": string | null,
    "title": string,
    "description": string,
    "year": number,
    "amount": number,
    "updatedAt": date,
    "createdAt": date,
    "Director": {
      "id": number,
      "fullname": string,
      "updatedAt": date,
      "createdAt": date,
    },
    "Category": {
      "id": number,
      "description": string
    }
}
```
<p>&nbsp;</p>

Buscar um novo filme:

```http
GET /movie/:title (opcional)
```
| Header | Type | Description |
| :--- | :--- | :--- |
| `Authorization` | `string` | **requerido**, formato: 'Bearer {token}'|

**Response**
```javascript
{
    "id": number,
    "idCategory": number,
    "idDirector": number,
    "pictureUrl": string | null,
    "title": string,
    "description": string,
    "year": number,
    "amount": number,
    "updatedAt": date,
    "createdAt": date,
    "Director": {
      "id": number,
      "fullname": string,
      "updatedAt": date,
      "createdAt": date,
    },
    "Category": {
      "id": number,
      "description": string
    }
}
```

se você não passar o parâmetro fullname terá todos os diretores retornados, exemplo:

```javascript
[
{
    "id": number,
    "idCategory": number,
    "idDirector": number,
    "pictureUrl": string | null,
    "title": string,
    "description": string,
    "year": number,
    "amount": number,
    "updatedAt": date,
    "createdAt": date,
    "Director": {
      "id": number,
      "fullname": string,
      "updatedAt": date,
      "createdAt": date,
    },
    "Category": {
      "id": number,
      "description": string
    }
},
{
    "id": number,
    "idCategory": number,
    "idDirector": number,
    "pictureUrl": string | null,
    "title": string,
    "description": string,
    "year": number,
    "amount": number,
    "updatedAt": date,
    "createdAt": date,
    "Director": {
      "id": number,
      "fullname": string,
      "updatedAt": date,
      "createdAt": date,
    },
    "Category": {
      "id": number,
      "description": string
    }
},
...
]
```
<p>&nbsp;</p>

Atualizar dados de um filme:

```http
PUT /movie/:id (requerido)
```
| Header | Type | Description |
| :--- | :--- | :--- |
| `Authorization` | `string` | **requerido**, formato: 'Bearer {token}'|

| Body | Type | Description |
| :--- | :--- | :--- |
| `idCategory` | `number` | **opcional**, ID da categoria|
| `idDirector` | `number` | **opcional**, ID do Diretor |
| `amount` | `number` | **opcional**, quantidade de cópias disponíveis |
| `pictureUrl` | `string` (url) | **opcional**, URL  da capa do filme|
| `description` | `string` | **opcional**, descrição ou sinopse do filme|
| `year` | number | **opcional**, ano de lançamento|

**Response**
```javascript
{
    "id": number,
    "idCategory": number,
    "idDirector": number,
    "pictureUrl": string | null,
    "title": string,
    "description": string,
    "year": number,
    "amount": number,
    "updatedAt": date,
    "createdAt": date,
    "Director": {
      "id": number,
      "fullname": string,
      "updatedAt": date,
      "createdAt": date"
    },
    "Category": {
      "id": number,
      "description": string
    }
}
```
<p>&nbsp;</p>


Atualizar dados de um filme:

```http
DELETE /movie/:id (requerido)
```
| Header | Type | Description |
| :--- | :--- | :--- |
| `Authorization` | `string` | **requerido**, formato: 'Bearer {token}'|

**Response**
```javascript
{
    "id": number,
    "idCategory": number,
    "idDirector": number,
    "pictureUrl": string | null,
    "title": string,
    "description": string,
    "year": number,
    "amount": number,
    "updatedAt": date,
    "createdAt": date,
    "Director": {
      "id": number,
      "fullname": string,
      "updatedAt": date,
      "createdAt": date"
    },
    "Category": {
      "id": number,
      "description": string
    }
}
```
<p>&nbsp;</p>


- ### Renter a movie: 

Alugar um filme:

```http
POST /movie/renter
```
| Header | Type | Description |
| :--- | :--- | :--- |
| `Authorization` | `string` | **requerido**, formato: 'Bearer {token}'|

| Body | Type | Description |
| :--- | :--- | :--- |
| `idMovie` | `string` | **requerido**|

**Response**
```javascript
{
  "id": number,
  "idMovie": number,
  "idUser": number,
  "returned": bool,
  "rentedAt": date,
  "returnedAt": date
}
```
<p>&nbsp;</p>

Devolver um filme alugado:

```http
PUT /movie/renter/:id
```
| Header | Type | Description |
| :--- | :--- | :--- |
| `Authorization` | `string` | **requerido**, formato: 'Bearer {token}'|


**Response**
```javascript
{
  "id": number,
  "idMovie": number,
  "idUser": number,
  "returned": bool,
  "rentedAt": date,
  "returnedAt": date
}
```
<p>&nbsp;</p>

Ver lista de filmes disponíveis:

```http
GET /movie/renter/available
```
| Header | Type | Description |
| :--- | :--- | :--- |
| `Authorization` | `string` | **requerido**, formato: 'Bearer {token}'|


**Response**
```javascript
[
{
  "id": number,
    "idCategory": number,
    "idDirector": number,
    "pictureUrl": string | null,
    "title": string,
    "description": string,
    "year": number,
    "amount": number,
    "updatedAt": date,
    "createdAt": date,
    "Director": {
      "id": number,
      "fullname": string,
      "updatedAt": date,
      "createdAt": date"
    },
    "Category": {
      "id": number,
      "description": string
    }
},
{
  "id": number,
    "idCategory": number,
    "idDirector": number,
    "pictureUrl": string | null,
    "title": string,
    "description": string,
    "year": number,
    "amount": number,
    "updatedAt": date,
    "createdAt": date,
    "Director": {
      "id": number,
      "fullname": string,
      "updatedAt": date,
      "createdAt": date"
    },
    "Category": {
      "id": number,
      "description": string
    }
},
...
]
```
<p>&nbsp;</p>

## Instalação e uso
**Obs.:** Para utilizar esse projeto certifique-se de estar utilizando a versão 12.8.4 do NodeJS ou superior.

* Clone o repositório:
    ```sh
    git clone https://github.com/pedroromeiro/typescript
    ```
* Vá para o diretório do projeto que você acabou de clonar
    ```sh
    cd ./typescript/backend/locadora-example
    ```
* Dentro da raiz do projeto execute o comando:
    ```sh
    npm install
    ```
    ou se tiver o yarn instalado:

    ```sh
    yarn install
    ```
    ##### esse comando irá baixar todas as dependências necessárias para o funcionamento correto do projeto.
    <p>&nbsp;</p>
 
 Pronto, agora você deve configurar os dados de acesso para seu banco de dados no arquivo [ormconfig.json](/ormconfig.json) que se encontra na raíz do projeto. Instale o MySQL8 em sua máquina e coloque os dados de configuração de acesso ao banco de dados no arquivo mencionado.

 Para garantir a segurança e a integridade dos dados altere as chaves de criptografia do Banco de Dados DB_KEY e DB_IV e a chave para geração do Json Web Token JWT_SECRET contidas no arquivo [key.json](/src/config/key.json) no diretório config dentro de src.

 * Com a dependências e as configurações de acesso ao banco de dados prontas, para iniciar, o projeto você deve dar o comando:
    
    ```sh
    npm run dev
    ```
    ou, caso deseje utilizar o yarn

    ```sh
    yarn dev
    ```
 * Para transpilar o código para Javascript e fazer o deploy, utilize o comando
    ```sh
    npm run build
    ```
    ou
    ```sh
    yarn build
    ```


<p>&nbsp;</p>

## Criptografia Avançada (AES)
Todos os dados sensíveis que são salvos no banco de dados são criptografados, a fim de, proteger e deixar os esses dados inúteis caso haja algum vazamento.

![criptografia](https://i.imgur.com/c2Tv4Pl.png)

<p>&nbsp;</p>

## Modelo Entidade Relacionamento (MER)
MySQL é o banco de dados desse projeto, usando typeORM como ORM (ferramente que ajuda de redução na impedância da programação utilizando banco de dados relacionais)
![MER](https://i.imgur.com/sYlVSJK.png)

