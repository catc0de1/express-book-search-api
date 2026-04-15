<!-- Readme template from https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a id="readme-top"></a>



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <div>
    <a href="https://expressjs.com/" target="_blank"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg" width="100" height="100" /></a>
    &nbsp;&nbsp;&nbsp;&nbsp;
    <a href="https://www.prisma.io/" target="_blank"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prisma/prisma-original.svg" width="100" height="100" /></a>
  </div>

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

