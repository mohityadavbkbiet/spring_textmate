# TextMate: A Full-Stack Text Processing and Analysis Platform

TextMate is a comprehensive web application engineered for advanced text manipulation and analytical tasks. It comprises a robust Spring Boot backend, providing secure user authentication and efficient text processing capabilities, complemented by an interactive React frontend for a seamless user experience. The platform supports a diverse set of text transformations, real-time linguistic analysis, and persistent user operation history.

## Key Features

*   **Text Transformation Suite:** Offers functionalities for converting text to uppercase, lowercase, title case, and reversing character sequences.
*   **Real-time Text Analytics:** Provides immediate insights into text properties, including word count, character count (excluding whitespace), sentence count, and estimated reading time.
*   **Secure User Authentication:** Implements secure user registration and login mechanisms leveraging JSON Web Tokens (JWT) for session management.
*   **Operation History Management:** Authenticated users can access a comprehensive log of their past text operations. Anonymous user activities are tracked via session IDs and can be seamlessly merged upon successful user login.
*   **Internationalization (i18n) Support:** The frontend is localized to support multiple languages, including English, Hindi, and Spanish.
*   **Responsive User Interface:** Developed with Bootstrap 5, ensuring a mobile-first, adaptive, and consistent user experience across various devices.
*   **Dynamic Theme Switching:** Features a toggle for switching between light and dark visual themes.

## Technology Stack

### Backend (Spring Boot)

*   **Framework:** Spring Boot 3.x
*   **Language:** Java 17
*   **Database:** MongoDB (via Spring Data MongoDB)
*   **Security:** Spring Security, JWT (jjwt library)
*   **Build System:** Apache Maven
*   **Logging:** SLF4J with Logback
*   **Development Utilities:** Lombok for reducing boilerplate code.

### Frontend (React)

*   **Framework:** React 19
*   **Build Toolchain:** Vite
*   **Styling:** Tailwind CSS, Bootstrap 5
*   **HTTP Client:** Axios
*   **Language:** JavaScript (ES6+)
*   **State Management:** Leverages React Hooks (useState, useEffect, useRef, useCallback) for efficient component state and lifecycle management.
*   **Internationalization:** Custom i18n implementation for flexible localization.

### Deployment & Orchestration

*   **Containerization:** Docker
*   **Container Orchestration:** Docker Compose
*   **Frontend Web Server:** Nginx

## Prerequisites

To set up and run TextMate, ensure the following dependencies are installed on your system:

*   **Java Development Kit (JDK):** Version 17 or higher. [Download JDK](https://www.oracle.com/java/technologies/javase-downloads.html)
*   **Apache Maven:** Version 3.6.0 or higher. [Install Maven](https://maven.apache.org/install.html)
*   **Node.js:** Version 18.x or higher (LTS recommended). [Download Node.js](https://nodejs.org/en/download/)
*   **npm:** Included with Node.js. Ensure it is updated: `npm install -g npm@latest`.
*   **MongoDB:** A running MongoDB instance. This can be a local installation ([MongoDB Community Server](https://www.mongodb.com/try/download/community)) or a Docker container (refer to the Docker setup section).
*   **Docker Desktop:** Includes Docker Engine and Docker Compose. [Download Docker Desktop](https://www.docker.com/products/docker-desktop)

## Deployment with Docker (Recommended)

This method provides the most streamlined approach to deploy the entire TextMate application stack, encompassing the backend, frontend, and MongoDB services.

**Note:** Verify that ports `5000` (frontend via Nginx), `8000` (backend), and `27017` (MongoDB) are available on your host system prior to deployment.

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/mohityadavbkbiet/spring_textmate.git
    ```
2.  **Navigate to the project root directory:**
    ```bash
    cd spring_textmate
    ```
3.  **Build and initiate Docker containers:**
    This command orchestrates the build process for both backend and frontend Docker images, followed by the creation and startup of their respective containers.
    ```bash
    docker-compose up --build
    ```
    *   Initial execution may require several minutes for base image downloads and application builds.
    *   The `--build` flag ensures image regeneration upon changes to `Dockerfile` or source code.

4.  **Access the Application:**
    Upon successful container initialization, the frontend will be accessible via your web browser at:
    [http://localhost:5000](http://localhost:5000)

    The backend API operates internally within the Docker network on port `8000` and is exposed via Nginx proxying.

5.  **Terminate the Application:**
    To gracefully stop the running services, press `Ctrl+C` in the terminal where `docker compose up` is active. Subsequently, to remove the containers, networks, and volumes provisioned by `docker compose` (including MongoDB data unless explicitly mounted to a persistent volume), execute:
    ```bash
    docker compose down -v
    ```

## Local Development Setup (Without Docker)

For direct execution of backend and frontend services on your local machine, follow these instructions. Ensure that ports `5000` (frontend), `8000` (backend), and `27017` (MongoDB) are available. A running MongoDB instance accessible at `mongodb://localhost:27017/textmate_db` is required.

### 1. Clone the Repository from GitHub
To begin working with the TextMate project on your local machine, first clone the repository using the command below. This will create a local copy of the entire project.
```bash
    git clone https://github.com/mohityadavbkbiet/spring_textmate.git
```
### 2.  Navigate to the project root directory:
```bash
    cd spring_textmate
```

### 3. MongoDB Service

Ensure a MongoDB instance is operational and accessible at `localhost:27017`. If not available, a Dockerized instance can be initiated:

```bash
docker run --name textmate-mongo -p 27017:27017 -d mongo:latest
```

### 4. Backend Service (Spring Boot)

1.  **Navigate to the backend directory:**
    ```bash
    cd Backend_Spring_Boot
    ```
2.  **Build and Execute the Spring Boot Application:**
    This command compiles the Java source, executes tests, and packages the application into an executable JAR, subsequently launching the application.
    ```bash
    ./mvnw spring-boot:run
    ```

### 5. Frontend Service (React)

1.  **Navigate to the frontend directory:**
    ```bash
    cd Frontend
    ```
2.  **Install Frontend Dependencies:**
    This command resolves and installs all requisite Node.js modules for the React application.
    ```bash
    npm install
    ```
3.  **Initiate Development Server:**
    This action starts the React development server, configured to proxy API requests to the backend service running on `http://localhost:8000`.
    ```bash
    npm run dev
    ```
4.  **Access the Application:**
    Once the development server is active, the frontend will be accessible in your web browser at the port indicated in your terminal (e.g., `http://localhost:5173`).

## API Endpoints

The Spring Boot backend exposes the following RESTful API endpoints:

*   `POST /api/signup`: User registration endpoint.
    *   **Request Body:** `{ "username": "string", "password": "string" }`
    *   **Response:** `ApiResponse` (status and message)
*   `POST /api/login`: User authentication endpoint.
    *   **Request Body:** `{ "username": "string", "password": "string" }`
    *   **Response:** `ApiResponse` (status, message, and JWT token)
*   `POST /api/uppercase`: Transforms input text to uppercase.
    *   **Request Body:** `{ "text": "string" }`
    *   **Response:** `ApiResponse` (transformed text)
*   `POST /api/lowercase`: Transforms input text to lowercase.
    *   **Request Body:** `{ "text": "string" }`
    *   **Response:** `ApiResponse` (transformed text)
*   `POST /api/titlecase`: Transforms input text to title case.
    *   **Request Body:** `{ "text": "string" }`
    *   **Response:** `ApiResponse` (transformed text)
*   `POST /api/reverse`: Reverses the input text.
    *   **Request Body:** `{ "text": "string" }`
    *   **Response:** `ApiResponse` (transformed text)
*   `POST /api/analyze`: Performs comprehensive text analysis.
    *   **Request Body:** `{ "text": "string" }`
    *   **Response:** `ApiResponse` (TextAnalysisResult object containing word count, character count, sentence count, and reading time)
*   `GET /api/history`: Retrieves the operation history for the authenticated user.
    *   **Authentication:** Requires a valid JWT in the `Authorization: Bearer <token>` header.
    *   **Response:** `ApiResponse` (list of `OperationLog` objects)

## Project Structure

```
TextMate/
├── .dockerignore
├── .gitignore
├── docker-compose.yml             # Docker Compose configuration for both services
├── README.md                      # This file
├── Backend_Spring_Boot/           # Spring Boot Backend
│   ├── .mvn/                      # Maven Wrapper files
│   ├── mvnw                       # Maven Wrapper script (Linux/macOS)
│   ├── mvnw.cmd                   # Maven Wrapper script (Windows)
│   ├── pom.xml                    # Maven project configuration
│   ├── Dockerfile                 # Dockerfile for the Spring Boot application
│   └── src/
│       ├── main/
│       │   ├── java/
│       │   │   └── com/textmate/textmatebackend/
│       │   │       ├── TextmateBackendApplication.java # Main application entry point
│       │   │       ├── config/      # Spring Security & JWT configuration
│       │   │       ├── controller/  # REST API controllers
│       │   │       ├── model/       # Data models (User, OperationLog, etc.)
│       │   │       ├── repository/  # MongoDB repositories
│       │   │       ├── service/     # Business logic services
│       │   │       └── util/        # Utility classes (TextUtils)
│       │   └── resources/
│       │       └── application.properties # Spring Boot configuration (ports, MongoDB, JWT secrets)
│       └── test/                  # Unit and integration tests
└── Frontend/                      # React Frontend
    ├── .gitignore
    ├── Dockerfile                 # Dockerfile for the React application (Nginx)
    ├── nginx.conf                 # Nginx configuration for serving React app and proxying API
    ├── package.json               # Node.js project configuration and dependencies
    ├── package-lock.json
    ├── tailwind.config.js         # Tailwind CSS configuration
    ├── vite.config.js             # Vite build tool configuration
    ├── public/                    # Static assets
    └── src/
        ├── App.jsx                # Main React component
        ├── index.css              # Global CSS
        ├── main.jsx               # React entry point
        ├── assets/                # Images, styles
        ├── components/            # Reusable UI components (Modals, Header, Footer, etc.)
        ├── hooks/                 # Custom React hooks (useTextMate)
        └── utils/                 # Utility functions (API calls, i18n translations)
```