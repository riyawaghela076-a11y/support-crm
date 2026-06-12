# Support CRM

A full-stack Support CRM for creating, tracking, searching, and updating customer support tickets. The backend uses Express and SQLite, and the frontend is a React + Vite application with React Router.

## Features

- Create support tickets with customer details, subject, description, status, and notes.
- Automatically generate ticket IDs such as `TKT-001`, `TKT-002`, and onward.
- View all tickets in a responsive card-based dashboard.
- Search tickets by customer name, customer email, ticket ID, or description.
- Filter tickets by status.
- View detailed ticket information.
- Update ticket status and internal notes.
- SQLite database storage with automatic table creation.
- Professional responsive UI with modern cards, hover states, and status badges.

## Tech Stack

- Backend: Node.js, Express, SQLite3, CORS
- Frontend: React, Vite, React Router
- Database: SQLite

## Project Structure

```text
backend/
├── controllers/
│   └── ticketController.js
├── database/
│   ├── crm.db
│   └── db.js
├── routes/
│   └── ticketRoutes.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── SearchBar.jsx
│   │   │   └── TicketCard.jsx
│   │   ├── pages/
│   │   │   ├── CreateTicket.jsx
│   │   │   ├── TicketDetails.jsx
│   │   │   └── TicketList.jsx
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
├── package.json
├── README.md
└── server.js
```

## Installation

### 1. Clone or open the project

```bash
cd backend
```

### 2. Install backend dependencies

```bash
npm install
```

### 3. Install frontend dependencies

```bash
cd frontend
npm install
```

## Running the Project

### Start the backend API

From the project root:

```bash
npm start
```

The backend runs at:

```text
http://localhost:5000
```

Health check:

```text
GET http://localhost:5000/
```

Expected response:

```text
Support CRM API Running
```

### Start the frontend

From the `frontend` folder:

```bash
npm run dev
```

The frontend runs at:

```text
http://localhost:5173
```

## API Endpoints

Base URL:

```text
http://localhost:5000/api
```

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/tickets` | Get all tickets. Supports `search` and `status` query params. |
| `POST` | `/tickets` | Create a new ticket. |
| `GET` | `/tickets/:ticketId` | Get a single ticket by numeric ID or ticket ID. |
| `PUT` | `/tickets/:ticketId` | Update ticket status and notes. |

### Example Queries

Search tickets:

```text
GET /api/tickets?search=jane
```

Filter by status:

```text
GET /api/tickets?status=Open
```

Search and filter together:

```text
GET /api/tickets?search=TKT-001&status=Open
```

## Database

The SQLite connection is configured in:

```text
database/db.js
```

The app connects to:

```text
database/crm.db
```

The `tickets` table is created automatically if it does not already exist.

## Screenshots

Add screenshots of the application here after running the frontend.

### Ticket Dashboard

```text
screenshots/ticket-dashboard.png
```

### Create Ticket

```text
screenshots/create-ticket.png
```

### Ticket Details

```text
screenshots/ticket-details.png
```

## Notes

- Keep the backend running on port `5000` because the frontend connects to `http://localhost:5000/api/tickets`.
- If the frontend runs on a different Vite port, use the URL printed by `npm run dev`.
- The SQLite database file is local to this project.
