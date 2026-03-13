<!-- Readme template from https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a id="readme-top"></a>



<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://expressjs.com/"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg" width="100" height="100"></a>
  &nbsp;&nbsp;&nbsp;&nbsp;
  <a href="https://www.prisma.io/"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prisma/prisma-original.svg" width="100" height="100"></a>
</p>

<h3 align="center">Book Search API (<i>Proto</i>)</h3>

  <p align="center">
    Prototype of Heavy Search Book API
    <br />
    <a href="https://github.com/catc0de1/nestjs-book-api"><strong>Visit Production Project »</strong></a>
    <br />
    <br />
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

This project is intended to be a prototype of a heavy-search book API for a library system. Another goal of this project is to learn the latest version of Prisma ORM and eventually implement a search engine using Meilisearch.

This prototype is built with Express for rapid development and will later be rewritten using NestJS for a production-ready implementation.

Features of this prototype include:

- a heavy endpoint for retrieving all books
- simple authentication for a single admin used for book management
- session-based authentication with rate limiting protection
- using [zod](https://zod.dev/) for validation schemas

The production version of this API is available at: [https://github.com/catc0de1/nestjs-book-api](https://github.com/catc0de1/nestjs-book-api)


<p align="right">(<a href="#readme-top">back to top</a>)</p>


### Built With

* [![Express.js][Express]][Express-url]
* [![PrismaORM][Prisma]][Prisma-url]
* [![TypeScript][Typescript]][Typescript-url]
* [![PostgreSQL][Postgres]][Postgres-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

### Prerequisites

* **Node.js**

  Use Node.js at least version 18, **better with version 20 or 22**

* **pnpm**

  ```sh
  npm install -g pnpm@latest
  ```

* **PostgreSQL**

  Download pgAdmin for using PostgreSQL GUI client in [https://www.pgadmin.org/](https://www.pgadmin.org/download/).

  Or use CLI client with docker container with:
  ```sh
  docker pull postgres
  ```

* **Vscode extensions**
  
  Optional but recommended extensions for use if using vscode as IDE:

  * **Prisma** by Prisma
  * **Biome** by biomejs

### Installation

1. **Clone the repo**

   ```sh
   git clone https://github.com/catc0de1/express-book-search-api.git
   ```

2. **Install dependencies**
   ```sh
   pnpm install
   ```

3. **Setup environment variables**

   Create `.env` file from `.env.example`

4. **Prisma init**

   ```sh
   # generate prisma client
   pnpm prisma generate

   # initial migration
   pnpm prisma migrate dev --name init

   # database seeding:
   pnpm prisma db seed
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

Run the development server with:
```sh
pnpm dev
```
Then server will listen on http://localhost:3000.
To Ensure the API is run properly, check the following endpoint:
```http
GET http://localhost:3000/api/health
GET http://localhost:3000/api/health/db
```
**Don't forget to start the local database**.

Use prisma studio to manage the database:
```sh
pnpm prisma studio
```
Prisma studio will run on http://localhost:51212.

This project uses [Biome](https://biomejs.dev/) as linter and formatter. Check `biome.json` for detailed rules.

There is a npm script to clear book table:
```sh
pnpm db:clear:book
```

**Book schema**:
|field        |type             |usage                          |
|-------------|-----------------|-------------------------------|
|title        |string           |book title                     |
|author       |string           |book author                    |
|year         |int              |book release year              |
|publisher    |string or null   |book publisher name            |
|description  |string or null   |book description               |
|category     |relation, string |book category on library       |
|bookLocation |relation, string |book rack location on library  |
|createdAt    |date             |date when the book was added   |
|updatedAt    |date             |date when the book was updated |

The heavy search endpoint is available at:
```http
GET http://localhost:3000/api/book
```
This endpoint returns paginated book results. Available query parameters:
|query param        |type                   |usage                              |
|-------------------|-----------------------|-----------------------------------|
|page               |number                 |page index                         |
|limit              |number                 |amount of books per page           |
|createdAtSort      |'asc' or 'desc' or null|sort by creation date              |
|titleSort          |'asc' or 'desc' or null|sort by book title                 |
|authorSort         |'asc' or 'desc' or null|sort by book author                |
|yearSort           |'asc' or 'desc' or null|sort by book release year          |
|publisherSort      |'asc' or 'desc' or null|sort by book publisher name        |
|categorySort       |'asc' or 'desc' or null|sort by book category in library   |
|bookLocationSort   |'asc' or 'desc' or null|sort by book location in library   |
|bookLocationFilter |string or null         |filter by book location in library |
|titleFilter        |string or null         |filter by book title               |

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

catc0de1 - catcode0101@gmail.com

Project Link: [https://github.com/catc0de1/express-book-search-api](https://github.com/catc0de1/express-book-search-api)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
<!-- Shields.io badges: https://github.com/inttter/md-badges -->
[Express]: https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=%2361DAFB
[Express-url]: https://expressjs.com/
[Prisma]: https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white
[Prisma-url]: https://www.prisma.io/
[Typescript]: https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=fff
[Typescript-url]: https://www.typescriptlang.org/
[Postgres]: https://img.shields.io/badge/Postgres-4169E1?style=for-the-badge&logo=postgresql&logoColor=white
[Postgres-url]: https://www.postgresql.org/
