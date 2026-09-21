# Travely

### Knowledge that takes you around the world 

Canberra is the capital of which country? Australia!

If you guessed correctly, you have the chance to win discounts on flights around the world. Travely is the app for anyone who wants to travel for less. Put your geography knowledge to the test in a fun and educational game and earn rewards that make your vacation even better.

## About the app

Travely is a school project created by 3 students, Anastasiya, Filippa and Linda-Maria as part of our studies at [Newton](https://www.newton.se/).

Travely is an educational geography game designed to help users learn and practice countries, flags and capitals in a fun and interactive way. The app combines learning with gamification, allowing users to test their knowledge and earn rewards based on their performance.

## Game Modes

Travely consists of three different game modes, designed to help the user gradually build and test their geographical knowledge.

**Learning Mode**
Start by exploring the learning material and familiarize yourself with countries, flags and capitals. This mode is designed to help users prepare for the game.

**Practice Mode**
Once you have studied the material, you can test your knowledge in Practice Mode. Practice Mode uses mock tests to help you prepare for the Challenge Mode. No points are counted in this mode, and you can redo the practice tests as many times as you like.

**Challenge Mode**
When you feel confident in your knowledge, it is time to enter Challenge Mode. This is where the real game begins. Your answers are scored and you earn points based on your performance. You will only have 15 seconds to answer each question, so make sure you are well prepared. Depending on your score, you can unlock a reward in the form of a discount code for your next vacation.

**Features**
- Learn about countries, flags and capitals
- Practice your knowledge without affecting your score
- Challenge yourself and earn points
- Track your progress
- Earn rewards based on your Challenge Mode performance
- User authentication and individual progress
- Repeat challenges to improve your score

**Design**
Parts of the application were designed in Figma before being implemented in the frontend. The design focuses on creating a clear, engaging and game-like experience while keeping the learning material easy to navigate.

## Tech Stack

**Backend**
- C#
- .NET
- ASP.NET Core
- Entity Framework Core
- ASP.NET Core Identity
- SQL Server

**Frontend**
- JavaScript
- React
- CSS
- Vite
- Chart.js

### Authentication & State Management
Authentication is handled using ASP.NET Core Identity with cookie-based authentication.
React useState and Context are used to manage application state, including user-related information and progress throughout the game.

### Database
SQL Server is used as the application's database, with Entity Framework Core handling communication between the application and the database.

### Testing
Automated tests have been implemented using Reqnroll. The tests are written in Gherkin and describe the expected behaviour of the application from a user's perspective.
The scenarios cover different user interactions and functionalities in Travely and can be executed through Visual Studio's Test Explorer.

### Project Structure
The project is divided into a backend and a frontend:
- Travely.Api – API and application entry point
- Travely.Application – Application logic
- Travely.Infrastructure – Database and infrastructure-related functionality
- Travely.Shared – Shared models and functionality
- travely-frontend – React frontend

### Purpose
The goal of Travely is to combine learning and entertainment. By allowing users to study, practice and finally challenge themselves, the application aims to make learning geography more engaging while giving users an additional incentive through the reward system.

### Deployment
Travely is deployed to Microsoft Azure. The backend and frontend are hosted using two separate Azure App Services, while the application uses Azure SQL Database for data storage.
The project is connected to GitHub Actions for continuous deployment, allowing changes from the main branch to be automatically deployed to Azure.

https://travely-frontend-2026-gta2arhfdxc9b0ck.germanywestcentral-01.azurewebsites.net/

## Future improvements
If we had more time we would love to develop these features:
- Find a purpose for counting score, perhaps connected with how fast the user can answer each question in Challenge Mode. The faster they answer the more points they score. The points could perhaps be traded for another discount.
- Make sure the user types in a real email address by sending an email to the address where the user must approve creating an account on Travely. Travely could also send an email to the user with the discount code so that they have it stored for later. The email could be used for password resets, verifying the user’s identity instead of handling password changes solely within the app.

## Getting Started

Travely is a full-stack application with a .NET 10 backend (`Travely.Api`, `Travely.Application`, `Travely.Infrastructure`, `Travely.Shared`), a React/Vite frontend (`travely-frontend`), and an automated end-to-end test suite (`Travely.Test`, using Reqnroll + NUnit + Playwright).

### Prerequisites

Before running Travely locally, make sure you have the following installed:

- .NET 10 SDK
- Node.js 22.x
- SQL Server LocalDB
- Visual Studio or another IDE that supports .NET development
- PowerShell (Windows) — macOS/Linux users can use Terminal

Playwright Chromium is installed separately as part of the test setup.

> **Don't have SQL Server LocalDB?** Install it via the **SQL Server Express** installer (choose the LocalDB option) or add the **"SQL Server Express LocalDB"** individual component through the Visual Studio Installer.

#### Verify installations

Open a terminal (PowerShell on Windows, Terminal on macOS/Linux) and run:

```bash
dotnet --version
```
Should return a 10.x version.

```bash
node --version
```
Should return a 22.x version.

```bash
sqllocaldb info
```
Should list a LocalDB instance, for example `MSSQLLocalDB`.

> `sqllocaldb` is Windows-only. On macOS/Linux, use SQL Server in a Docker container or another local SQL Server instance instead, and update the connection string in `Travely.Api/appsettings.json` accordingly.

## Installation

1. **Clone the project from GitHub**

2. **Trust the local HTTPS certificate**
```bash
   dotnet dev-certs https --trust
```

3. **Restore backend packages**

   From the root `Travely` folder, run:
```bash
   dotnet restore
```

4. **Install Entity Framework Core CLI**

   If `dotnet ef` isn't already installed on your computer:
```bash
   dotnet tool install --global dotnet-ef
```

5. **Create and update the database**
```bash
   dotnet ef database update --project Travely.Infrastructure --startup-project Travely.Api
```
   This creates/updates the local database using the Entity Framework Core migrations included in the project.

6. **Start the backend and leave it running**

   From the root `Travely` folder, run:
```bash
   dotnet run --project Travely.Api
```
   Leave the backend running. The API should be available at:
```
   https://localhost:7009
```

7. **Test accounts**

   On first run, two test accounts are seeded:
   - `test@user.com` with password `Test123!`
   - `test@login.com` with password `Test123!`

   These are for testing purposes — please create your own users.

8. **Create a `.env` file in `travely-frontend` and add following:**
```
   VITE_API_BASE_URL=https://localhost:7009
```

9. **Install frontend dependencies**

   Open a new terminal window and navigate to the frontend:
```bash
   cd travely-frontend
   npm install
```

10. **Start the frontend**
```bash
    npm run dev
```
    The frontend will be available at the URL shown in the terminal, normally:
```
    http://localhost:5173
```

> The backend and frontend must both be running for the application to work correctly.

## Running the Tests

Travely includes automated end-to-end browser tests using Reqnroll and Playwright. The tests interact with the application through a Chromium browser window and require both the backend and frontend to be running.

1. **Build the test project**

   From the root `Travely` folder, run:
```bash
   dotnet build Travely.Test
```

2. **Install Playwright Chromium**

   After building the test project, install the browser binaries.

   **Windows (PowerShell):**
```powershell
   .\Travely.Test\bin\Debug\net10.0\playwright.ps1 install
```

   **macOS/Linux:**
```bash
   dotnet tool install --global Microsoft.Playwright.CLI
   playwright install
```

3. **Start the application**

   Make sure both the backend and frontend are running:

   Backend:
```bash
   dotnet run --project Travely.Api
```

   Frontend:
```bash
   cd travely-frontend
   npm run dev
```

4. **Run the tests**

From the root `Travely` folder, run:
```bash
   dotnet test
```

The tests will launch a visible Chromium browser via Playwright and execute the configured test scenarios against the running Travely application.

## Notes

- If you ever reset the database (`dotnet ef database drop`), re-run the API once so the two test accounts get reseeded.
- The test suite hardcodes `https://localhost:7009` and `http://localhost:5173` — those exact ports must be free.

## Project notes

Travely is an educational project. Some country facts, hints and descriptions may be AI-assisted and should be treated as learning material rather than an official fact database or travel guide.

Rewards, discounts and travel offers shown in the app are not real. They are part of the project story and are included to demonstrate how Travely could work together with a travel company.

## Image and flag sources

Country images are mainly sourced from:

- [Unsplash](https://unsplash.com/)
- [Pixabay](https://pixabay.com/)

Detailed country image source links are listed in [CREDITS.md](public/CREDITS.md).

Flag images are based on:

- [flag-icons](https://github.com/lipis/flag-icons)

