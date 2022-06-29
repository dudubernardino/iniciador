<h3 align="center">
  Iniciador API Project
</h3>

<p align="center">An rest api for bank account requests.</p>

<p align="center">
  <a href="#%EF%B8%8F-about-the-project">About the project</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-technologies">Technologies</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-getting-started">Getting started</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-how-to-contribute">How to contribute</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-license">License</a>
</p>

## 🏦 About the project

This api contains services needed to transfer money and generate bills.

Account holders can transfer amounts to other holders, even from other banks.

Typeable lines of bills of exchange can be generated and verified.

## 🚀 Technologies

Technologies that I used to develop this api

- [Node.js](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)
- [Nest.js](https://nestjs.com/)
- [TypeORM](https://typeorm.io/#/)
- [PostgreSQL](https://www.postgresql.org/)
- [Swagger](https://swagger.io/)
- [Eslint](https://eslint.org/)
- [Prettier](https://prettier.io/)

## 💻 Getting started

### Requirements

- [Node.js](https://nodejs.org/en/)
- [Yarn](https://classic.yarnpkg.com/) or [npm](https://www.npmjs.com/)
- One instance of [PostgreSQL](https://www.postgresql.org/)

> Obs.: I recommend to use docker to postgres

**Clone the project and access the folder**

```bash
$ git clone https://github.com/dudubernardino/iniciador && cd iniciador
```

**Follow the steps below**

```bash
# Install the dependencies
$ yarn

# Make a copy of '.env.example' to '.env'
# and set with YOUR environment variables.
# The aws variables do not need to be filled for dev environment
$ cp .env.example .env

# Create the instance of postgreSQL using docker
$ docker run --name postgres-db -e POSTGRES_USER=iniciador_user -e POSTGRES_PASSWORD=magical_password -p 5432:5432 -d postgres

# To finish, run the api service
$ yarn start:dev

# Run the auth service
$ yarn start:dev:auth

# Well done, project is started!
```

## 📚 Docs

I used [swagger](https://swagger.io/) to document the API. You can use this routes to test the app

- `localhost:3000/api`: this route contains the services of the api.;

- `localhost:3001/auth`: this route contains the services of the auth.;

## 🤔 How to contribute

**Make a fork of this repository**

```bash
# Fork using GitHub official command line
# If you don't have the GitHub CLI, use the web site to do that.

$ gh repo fork dudubernardino/iniciador
```

**Follow the steps below**

```bash
# Clone your fork
$ git clone your-fork-url && cd iniciador

# Create a branch with your feature
$ git checkout -b my-feature

# Make the commit with your changes
$ git commit -m 'feat: My new feature'

# Send the code to your remote branch
$ git push origin my-feature
```

After your pull request is merged, you can delete your branch

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Made with ❤️ &nbsp;by Eduardo Bernardino 👋 &nbsp;[See my linkedin](https://www.linkedin.com/in/dudubernardino/)
