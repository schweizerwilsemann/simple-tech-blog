# TechBlog - Full-Stack Blog Platform

This repository contains the source code for TechBlog, a full-stack application featuring a **.NET 10** Web API backend and an **Angular 21** frontend.

## Project Names

- Backend: **Project.API**
- Frontend: **techblog**

---

## Prerequisites

Ensure the following specific versions (or higher) are installed:

- [.NET 10 SDK](https://dotnet.microsoft.com/download/dotnet/10.0)
- [Node.js](https://nodejs.org/en/) (LTS version recommended)
- [Angular CLI](https://angular.io/cli)
- A running instance of SQL Server.

---

## Setup & Installation

### 1. Backend Setup (Project.API)

1. **Navigate to the API Project Directory:**

    ```sh
    cd API/Project.API/Project.API
    ```

2. **Configure Database Connection:**
    - Open `appsettings.Development.json`.
    - Update `DefaultConnection` and `AuthConnectionString` to point to your SQL Server instance.

3. **Restore Tools & Apply Migrations:**
    This project uses local .NET tools. Restore them and then update the database.

    ```sh
    dotnet tool restore
    dotnet ef database update --context ApplicationDbContext
    dotnet ef database update --context AuthDbContext
    ```

4. **Run the Backend Server:**

    ```sh
    dotnet watch run
    ```

    The API will launch on the URL configured in `Properties/launchSettings.json` (e.g., `https://localhost:7166`).

### 2. Frontend Setup (techblog)

1. **Navigate to the UI Project Directory:**
    Open a **new terminal** for this.

    ```sh
    cd UI/techblog
    ```

2. **Install NPM Dependencies:**

    ```sh
    npm install
    ```

3. **Configure API Endpoint:**
    - Open `src/environments/environment.development.ts`.
    - Ensure `apiBaseUrl` points to your running backend API (e.g., `https://localhost:7166`).

4. **Run the Frontend Development Server:**

    ```sh
    ng serve
    ```

    The application will be available at `http://localhost:4200/`.
