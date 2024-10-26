# Team Fight-Club
# AGRI LINK - Farm Equipment Rental Platform

Agri Link is a platform that enables farmers to rent or share equipment, access government schemes, and learn best practices in farming.

## Directory Structure
- **frontend/** - React-based frontend for user interaction.
- **backend/** - Node.js and Express backend for server operations.
- **database/**- Mongodb

## Setup Instructions

### 1. Clone the Repository
```bash
git clone <repo_url>
cd <repo_name>
```

### 2. Install Dependencies
Navigate to the `frontend` and `backend` directories and run:
```bash
npm install
```

### 3. Environment Setup

- **Frontend**: In the `frontend` directory, create a `.env` file with:
  ```plaintext
  VITE_BASE_URL="http://localhost:3000"
  ```

- **Backend**: In the `backend` directory, create a `.env` file with the following environment variables:
  ```plaintext
  PORT=3000
  JWT_SECRET=<your_jwt_secret_key>
  MONGO_URI=<your_mongodb_connection_string>
  ```
  Replace `<your_jwt_secret_key>` with a secure key of your choice, and `<your_mongodb_connection_string>` with the correct MongoDB URI.

### 4. Run on Localhost
- **Frontend**: In the `frontend` directory, start the development server on port 5173:
  ```bash
  npm run dev
  ```

- **Backend**: In the `backend` directory, start the server on port 3000:
  ```bash
  npm run dev
  ```

## Additional Notes
- Make sure the `.env` file in the backend is properly configured for the application to run successfully.
