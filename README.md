
# Jua Legal

Jua Legal is an AI-powered LegalTech platform that offers users legal assistance and lawyer recommendations based on location and case type. It leverages AI for user interaction and legal advice, with the goal of enhancing accessibility to legal services in Africa.

## Table of Contents
- [Live Project](#live-project)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Environment Variables](#environment-variables)

## Live Project

Access the live project here: [Jua Legal Live](https://jua-legal.vercel.app/)

## Features

- AI-powered chatbot for legal assistance
- Lawyer recommendations based on locality and case type
- Integration with the Gemini API for AI functionalities
- Secure user authentication and personalized recommendations

## Tech Stack

- **Backend**: Django, PostgreSQL, Gemini API
- **Frontend**: React.js
- **Deployment**: Vercel (Frontend), Heroku/Custom Server (Backend)

## Project Structure

The repository contains two main folders:
- **backend/** - Contains the Django backend code for handling API requests, user authentication, and lawyer recommendations.
- **frontend/** - Contains the React code for the user interface, interacting with the backend API and displaying the chatbot interface.

## Setup Instructions

Follow these steps to set up the project locally.

### Prerequisites
- Python 3.8+
- Node.js 14+
- PostgreSQL

### 1. Clone the Repository

```bash
git clone https://github.com/Mikiejoe/jua-legal.git
cd jua-legal
```

### 2. Set Environment Variables

Create a `.env` file in the root directory and add the following environment variables:

```plaintext
DB_NAME=<YourDatabaseName>
DB_USER=<YourDatabaseUser>
DB_PASSWORD=<YourDatabasePassword>
DB_HOST=<YourDatabaseHost>
DB_PORT=5432
GEMINI_API_KEY=<YourGeminiApiKey>
SECRET_KEY=<YourDjangoSecretKey>
DEBUG=<TrueOrFalse>
DEVELOPMENT=<TrueOrFalse>
EMAIL_HOST_USER=<YourEmailHostUser>
EMAIL_HOST_PASSWORD=<YourEmailHostPassword>
```

### Backend Setup

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Create a virtual environment and activate it:**
   ```bash
   python -m venv env
   source env/bin/activate  # For Windows: env\Scripts\activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up the database:**
   Ensure your PostgreSQL database is running and configured with the environment variables above.

5. **Run migrations:**
   ```bash
   python manage.py migrate
   ```

6. **Start the backend server:**
   ```bash
   python manage.py runserver
   ```

The backend server should now be running on `http://127.0.0.1:8000`.

### Frontend Setup

1. **Navigate to the frontend directory:**
   ```bash
   cd ../frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the frontend server:**
   ```bash
   npm start
   ```

The frontend server should now be running on `http://localhost:3000`.

## Environment Variables

The following environment variables are required for the project to run:

| Variable             | Description                          |
|----------------------|--------------------------------------|
| `DB_NAME`            | Name of the PostgreSQL database      |
| `DB_USER`            | PostgreSQL database username         |
| `DB_PASSWORD`        | PostgreSQL database password         |
| `DB_HOST`            | Database host (usually `localhost`)  |
| `DB_PORT`            | Database port (default `5432`)       |
| `GEMINI_API_KEY`     | API key for Gemini API               |
| `SECRET_KEY`         | Django secret key                    |
| `DEBUG`              | Debug mode (`True` or `False`)       |
| `DEVELOPMENT`        | Development mode (`True` or `False`) |
| `EMAIL_HOST_USER`    | Email for notifications              |
| `EMAIL_HOST_PASSWORD`| Email password for notifications     |




