# Brighte Eats

Brighte Eats is a system to accept expresions of interest for a new product and to view those leads in a dashboard.

## Project Structure

```
.
├── backend/                 # GraphQL API with TypeGraphQL, TypeORM
└── brighte-eats-frontend/   # Vue 3 frontend with Apollo & Tailwind
```

---

## Setup Instructions

### Prerequisites

- Node.js (v18.x or v20.x recommended)
- Docker & Docker Compose
- PostgreSQL (if running backend locally)
- npm

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/brighte-eats.git
cd brighte-eats
```

---

## Run with Docker Compose

```bash
docker-compose up --build
```

This will build and start the backend server and serve the Vue 3 frontend on `http://localhost:3000`

---

## Backend Setup (Manual)

```bash
cd backend
npm install
npm run dev
```

GraphQL Playground will be available at:  
`http://localhost:4000/graphql`

You can test the `register` mutation:

```graphql
mutation RegisterLead($input: RegisterLeadInput!) {
  register(input: $input) {
    id
    name
    email
    mobile
    postcode
    services
  }
}
```

---

## Running Tests (Backend)

Ensure you have installed the project dependencies

```bash
npm install
```

Use the following command to run all tests:

```
npm test
```

We use **Jest** for testing and **ts-jest** for TypeScript support.
Entity and database operations are mocked to keep tests fast and isolated.

---

## Frontend Setup (Manual)

```bash
cd brighte-eats-frontend
npm install
npm run dev
```

- Access the app at: `http://localhost:5173`
- Uses Tailwind CSS for styling
- Apollo Client to communicate with the backend GraphQL API

---

## Technologies Used

### Backend:
- [TypeGraphQL](https://typegraphql.com/)
- [TypeORM](https://typeorm.io/)
- [Class Validator](https://github.com/typestack/class-validator)
- [Winston](https://github.com/winstonjs/winston) (for logging)
- PostgreSQL

### Frontend:
- [Vue 3](https://vuejs.org/)
- [Vue Router](https://router.vuejs.org/)
- [Apollo Client](https://apollo.vuejs.org/)
- [Tailwind CSS](https://tailwindcss.com/)

---

## Example Environment Files

### backend/.env

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=brighte_eats
```

---

## 📄 License

MIT © 2025
