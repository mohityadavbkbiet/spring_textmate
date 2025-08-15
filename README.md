# TextMate: A Full-Stack Text Processing and Analysis Platform

TextMate is a web application for text manipulation and analysis. It features a Spring Boot backend and a React frontend.

## Key Features

*   **Text Transformation:** Convert text to uppercase, lowercase, title case, and reverse.
*   **Text Analysis:** Get word count, character count, sentence count, and estimated reading time.
*   **User Authentication:** Secure user registration and login with JWT.
*   **Operation History:** Log and view past text operations.
*   **Internationalization (i18n):** Support for English, Hindi, and Spanish.
*   **Responsive Design:** A mobile-first UI built with Bootstrap 5.
*   **Light/Dark Mode:** Switch between light and dark themes.

## Technology Stack

**Backend:**
*   Java 17
*   Spring Boot 3
*   Spring Security, JWT
*   MySQL, Spring Data JPA
*   Maven

**Frontend:**
*   React 19
*   Vite
*   Tailwind CSS, Bootstrap 5
*   Axios
*   JavaScript (ES6+)

**Deployment:**
*   Docker, Docker Compose
*   Nginx

## Getting Started

### Prerequisites

*   JDK 17+
*   Maven 3.6+
*   Node.js 18+
*   Docker Desktop

### 1. Clone the Repository

```bash
git clone https://github.com/mohityadavbkbiet/spring_textmate.git
cd spring_textmate
```

### 2. Run the Application

You can run the application using Docker (recommended) or by running the backend and frontend services locally.

**Option 1: Docker (Recommended)**

This is the easiest way to get started. It will spin up the backend, frontend, and a MySQL database.

1.  **Build and start the containers:**
    ```bash
    docker-compose up --build
    ```
2.  **Access the application:**
    *   Frontend: [http://localhost:5000](http://localhost:5000)

**Option 2: Local Setup**

1.  **Start a MySQL database:**
    You can use Docker to start a MySQL instance:
    ```bash
    docker run --name textmate-mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=password -e MYSQL_DATABASE=textmate_db -d mysql:latest
    ```
2.  **Run the backend:**
    ```bash
    cd Backend_Spring_Boot
    ./mvnw spring-boot:run
    ```
3.  **Run the frontend:**
    In a new terminal:
    ```bash
    cd Frontend
    npm install
    npm run dev
    ```
4.  **Access the application:**
    *   Frontend: [http://localhost:5173](http://localhost:5173) (or whatever port is shown in the terminal)

## API Endpoints

*   `POST /api/signup`: User registration.
*   `POST /api/login`: User authentication.
*   `POST /api/uppercase`: Transform text to uppercase.
*   `POST /api/lowercase`: Transform text to lowercase.
*   `POST /api/titlecase`: Transform text to title case.
*   `POST /api/reverse`: Reverse text.
*   `POST /api/analyze`: Analyze text.
*   `GET /api/history`: Get operation history.

## Project Structure

```
TextMate/
├── Backend_Spring_Boot/ # Spring Boot backend
├── Frontend/            # React frontend
├── docker-compose.yml
└── README.md
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.