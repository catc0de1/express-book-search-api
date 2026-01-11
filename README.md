# Book Search API

Simple **Book Search API** built with **Express**, **TypeScript**, **Prisma ORM**, **PostgreSQL**, and **Meilisearch**.

---

## Scope & Features

### Public

- Search book
- See book list
- See book detail

### Admin (Simple Auth)

- Create book
- Update book
- Delete book

---

## Tech Stack

- **Node.js**
- **Express**
- **TypeScript**
- **PostgreSQL**
- **Prisma ORM**
- **Meilisearch**

---

## Setup & Installation

1. **Clone Repository**
    ```bash
    git clone https://github.com/catc0de1/express-book-search-api.git
    cd prisma-book-api
    ```

2. **Install Dependencies**

    ```bash
    pnpm install
    ```

3. **Environment Variables**

    Create `.env` file from `.env.example`:

    ```env
    NODE_ENV=production
    DATABASE_URL="postgresql://username:password@localhost:5432/book_api"
    ```

4. **Prisma Setup**

    ```bash
    npx prisma generate
    ```

    ```bash
    npx prisma migrate dev --name init
    ```

    Prisma Studio:

    ```bash
    npx prisma studio
    ```

5. **Run Development Server**

    ```bash
    pnpm dev
    ```

    Server will run on http://localhost:3500

---

## License

[MIT](https://github.com/catc0de1/express-book-search-api?tab=MIT-1-ov-file)