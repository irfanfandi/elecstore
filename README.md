# elecstore

## Setup Instructions

### Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version X.X.X or higher)
- [bun](https://bun.sh/) (make sure to install bun)
- [Docker](https://www.docker.com/)
- [Git](https://git-scm.com/)

### Backend Setup

1. **Clone the repository:**
   ```bash
   git clone git@github.com:irfanfandi/elecstore.git
   cd elecstore
   ```

2. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

3. **Install dependencies:**
   ```bash
   bun install
   ```

4. **Set up environment variables:**
   Create a `.env` file in the backend directory and add the necessary environment variables. Example:
   ```
   DATABASE_URL=your_database_url
   PORT=your_port
   ```

5. **Run the backend server:**
   ```bash
   bun run --watch src/index.ts
   ```

### Frontend Setup

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   bun install
   ```

3. **Run the frontend application:**
   ```bash
   bun start
   ```

### Running with Docker

1. **Build the Docker image:**
   ```bash
   docker-compose build
   ```

2. **Run the Docker containers:**
   ```bash
   docker-compose up
   ```

### Prisma Commands

To run migrations and seed the database, use the following commands:

1. **Run migrations:**
   ```bash
   bun run prisma migrate deploy
   ```

2. **Seed the database:**
   ```bash
   bun run prisma db seed
   ```

### Accessing the Application

- The backend will be running on `http://localhost:3000`.
- The Prisma Studio will be accessible at `http://localhost:5555`.
- The frontend will be running on `http://localhost:5173` (or the port specified in your frontend configuration).

### Additional Notes

- Ensure that the backend is running before starting the frontend.
- For any issues, check the console for error messages and refer to the documentation for troubleshooting.
