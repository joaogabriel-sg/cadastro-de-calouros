<div align="center">
  <h1 style="font-size: 36px; font-weight: bold;">Cadastro de Calouros</h1>
</div>

An API developed in NodeJS for the Introduction to Software Engineering class, in order to explain about software testing with a focus on unit tests, integration tests and test coverage.

## ๐ฎ Getting started

<h3 style="font-size: 14px;">๐ Downloading softwares</h3>

- NodeJS and NPM: [https://nodejs.org/en/](https://nodejs.org/en/)
- Yarn (optional): [https://yarnpkg.com/getting-started/install](https://yarnpkg.com/getting-started/install)
- VS Code: [https://code.visualstudio.com](https://code.visualstudio.com)
- Insomnia: [https://insomnia.rest/download](https://insomnia.rest/download)

<h3 style="font-size: 14px;">๐งฌ Clone this repository</h3>

```bash
git clone https://github.com/joaogabriel-sg/cadastro-de-calouros.git
```

<h3 style="font-size: 14px;">๐ Move yourself to the appropriate repository</h3>

```bash
cd cadastro-de-calouros
```

<h3 style="font-size: 14px;">๐ Install the package dependencies</h3>

```bash
npm install
# or
yarn
```

## ๐ฅ Usage

```bash
npm run dev
# or
yarn dev
```

## ๐งช Testing

```bash
npm test
# or
yarn test
```

## ๐ API

<h3 style="font-size: 14px;">๐ Routes</h3>

```bash
GET     /students         Get students
GET     /students/{id}    Get a student
POST    /students         Create a new student
PUT     /students/{id}    Update an existent student
DELETE  /students/{id}    Delete a student
```

<h3 style="font-size: 14px;">๐ Student structure</h3>

```typescript
interface Student {
  id: string,
  name: string,
  email: string,
  cep: number,
  address: string,
  number: number,
  neighborhood: string,
  city: string,
  uf: string,
  degree: string,
  age: number,
},
```
