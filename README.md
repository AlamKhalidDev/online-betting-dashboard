# Online Betting Dashboard

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies](#technologies)
- [Folder Structure](#folder-structure)
- [Setup and Installation](#setup-and-installation)
  - [Prerequisites](#prerequisites)
  - [Environment Variables](#environment-variables)
  - [Local Development](#local-development)
  - [Running with Docker](#running-with-docker)
- [Testing](#testing)
- [API Endpoints](#api-endpoints)
- [Front-end Usage](#front-end-usage)

## Project Overview

This Online Betting Dashboard is a full-stack project designed to allow users to browse sporting events, view odds, and place simulated bets. The back-end is built with Node.js, Express, Prisma, and PostgreSQL, while the front-end uses React, Vite, and Material-UI. The application can be run locally or via Docker for seamless development and deployment.

## Features

- **Event Management (CRUD)**: Backend API to create, read, update, and delete sporting events.
- **Responsive UI**: Front-end grid layout that adapts to different screen sizes.
- **Search & Filter**: Quickly find events by name or sport type.
- **Bet Placement Modal**: Simulate placing bets with stake input and potential return calculation.
- **Testing**: Unit tests for backend (Jest + Supertest) and frontend (Vitest + React Testing Library).
- **Dockerized**: Ready-to-use Docker and Docker Compose configuration.

## Technologies

- **Back-end**: Node.js, Express, TypeScript, Prisma ORM, PostgreSQL, Jest, Supertest
- **Front-end**: React, Vite, TypeScript, Material-UI, Vitest
- **DevOps**: Docker, Docker Compose

## Folder Structure

```
online-betting-dashboard/
├── backend/                    # Express API server
│   ├── src/
│   │   ├── config/             # Prisma client setup
│   │   ├── controllers/        # Route handlers
│   │   ├── middleware/         # Error handling, validation
│   │   ├── routes/             # API routes
│   │   ├── services/           # Business logic
│   │   ├── app.ts              # Express app configuration
│   │   └── server.ts           # Server bootstrap
│   ├── prisma/                 # Database schema & migrations
│   ├── Dockerfile
│   ├── .env                    # Environment variables
│   ├── package.json
│   └── tsconfig.json
├── frontend/                   # React client application
│   ├── src/
│   │   ├── components/         # UI components
│   │   ├── hooks/              # Custom React hooks
│   │   ├── services/           # API calls
│   │   ├── types/              # TypeScript interfaces & types
│   │   ├── App.tsx             # Main application component
│   │   └── main.tsx            # Entry point
│   ├── Dockerfile
│   ├── .env                    # Front-end environment variables
│   ├── package.json
│   └── tsconfig.json
├── docker-compose.yml          # Orchestrate both services
└── README.md                   # This documentation
```

## Setup and Installation

### Prerequisites

- Node.js (v18 or later)
- npm (or pnpm/yarn)
- Docker & Docker Compose (for containerized setup)

### Environment Variables

#### Backend (`backend/.env`)

```dotenv
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/betting
PORT=3000
```

#### Frontend (`frontend/.env`)

```dotenv
VITE_API_URL=http://localhost:3000
```

### Local Development

1. **Backend**
   ```bash
   cd backend
   npm install                # Install dependencies
   npm run prisma:generate    # Generate Prisma client
   npm run prisma:migrate     # Apply migrations to your database
   npm run prisma:seed        # Seed initial data
   npm run dev                # Start server in watch mode
   ```
2. **Frontend**
   ```bash
   cd frontend
   npm install
   npm run dev                # Start dev server
   ```

### Running with Docker

```bash
docker-compose up --build
```

- Backend: http://localhost:3000
- Frontend: http://localhost:5173

## Testing

- **Backend**: In `backend/` run:
  ```bash
  npm test
  ```
- **Frontend**: In `frontend/` run:
  ```bash
  npm test
  ```

## API Endpoints

| Method | Endpoint          | Description                    |
| ------ | ----------------- | ------------------------------ |
| GET    | `/api/events`     | Retrieve list of all events    |
| GET    | `/api/events/:id` | Retrieve a single event by ID  |
| POST   | `/api/events`     | Create a new event             |
| PUT    | `/api/events/:id` | Update an existing event by ID |
| DELETE | `/api/events/:id` | Delete an event by ID          |

## Front-end Usage

- Browse, search, and filter events.
- Click **Place Bet** to open modal, enter stake, and see potential return.