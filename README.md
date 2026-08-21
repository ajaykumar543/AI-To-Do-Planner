# AI To-Do Planner

**Turn your goals into actionable tasks with AI.**

AI To-Do Planner is an AI-powered productivity web application that helps users transform large goals into smaller, organized, and actionable tasks. Instead of manually planning every step, users can enter their goal and let the AI generate a structured task plan.

The application combines **AI API integration, task management, progress tracking, and a modern responsive user interface** to create a practical productivity solution.

---

## Project Overview

Planning a large goal can often feel difficult when there are many tasks involved. AI To-Do Planner simplifies this process by using AI to analyze the user's goal and generate relevant subtasks.

For example, if a user enters:

> Prepare for my semester exams in 30 days

The application can generate a structured plan such as:

* Collect the syllabus
* Divide subjects into topics
* Create a study schedule
* Study individual topics
* Practice previous question papers
* Revise difficult topics
* Take mock tests

Users can then manage these generated tasks just like a normal task management application.

---

## Features

### AI-Powered Task Generation

Enter a goal and let the AI generate a structured list of actionable tasks.

### Goal-Based Planning

Convert large and complex goals into smaller, manageable steps.

### Task Management

Users can:

* Add tasks
* Edit tasks
* Delete tasks
* Mark tasks as completed
* Undo completed tasks
* Search tasks
* Filter tasks
* Sort tasks
* Clear completed tasks

### Priority Management

Tasks can be organized based on:

* High Priority
* Medium Priority
* Low Priority

### Deadline Management

Users can set deadlines and organize tasks according to their due dates.

The application can also identify:

* Upcoming tasks
* Tasks due today
* Overdue tasks
* Completed tasks

### Progress Tracking

The dashboard provides:

* Total tasks
* Completed tasks
* Pending tasks
* Overall completion percentage
* Visual progress bar

Progress is automatically updated whenever the task status changes.

### Persistent Task Data

Task information is stored locally so that tasks remain available after refreshing the application.

### Responsive UI

The application is designed to work across:

* Desktop
* Laptop
* Tablet
* Mobile devices

### Error and Loading Handling

The application provides appropriate states for:

* AI generation
* API errors
* Network failures
* Invalid input
* Empty task lists

---

## How It Works

```text
User enters a goal
        ↓
Selects deadline and priority
        ↓
Clicks "Generate AI Plan"
        ↓
Frontend sends request
        ↓
Backend/API service
        ↓
AI processes the goal
        ↓
AI generates structured tasks
        ↓
Tasks are returned to the application
        ↓
Tasks appear on the dashboard
        ↓
User manages and tracks progress
```

---

## AI Integration

The project is designed to work with an AI API for generating task plans.

The AI receives information such as:

* User goal
* Deadline
* Priority
* Available time
* Additional preferences

The AI generates structured task information including:

* Task title
* Description
* Priority
* Estimated time
* Due date

The response is validated before being displayed in the application.

The API architecture is separated from the UI so that the AI provider or model can be changed without redesigning the application.

---

## Security

API credentials should **never be exposed in frontend JavaScript**.

Sensitive API keys should be stored using environment variables.

Example:

```env
AI_API_KEY=your_api_key_here
```

A `.env.example` file can be provided to show the required configuration without exposing actual credentials.

---

## Technology Stack

### Frontend

* HTML5
* CSS3
* JavaScript
* Responsive Web Design

### AI

* AI API
* Structured AI responses
* Prompt-based task generation

### Storage

* Browser LocalStorage

### Development Tools

* Visual Studio Code
* Git
* GitHub

---

## Project Structure

```text
AI-To-Do-Planner/
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── backend/
│   ├── server.js
│   └── routes/
│       └── ai.js
│
├── services/
│   └── aiService.js
│
├── .env.example
├── package.json
└── README.md
```

> The exact structure may vary depending on the implementation.

---

## Getting Started

### 1. Clone the Repository

```bash
git clone <your-repository-url>
```

### 2. Navigate to the Project

```bash
cd AI-To-Do-Planner
```

### 3. Install Dependencies

If the project contains a Node.js backend:

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env` file and add your AI API key:

```env
AI_API_KEY=your_api_key_here
```

Do not upload the `.env` file to GitHub.

Make sure `.env` is included in `.gitignore`.

### 5. Start the Application

Use the appropriate command configured in your project:

```bash
npm start
```

or:

```bash
npm run dev
```

### 6. Open the Application

Open the local development URL shown in your terminal.

---

## Example Workflow

### Step 1 — Enter Goal

```text
Learn Python programming in 30 days
```

### Step 2 — Set Preferences

```text
Deadline: 30 days
Priority: High
```

### Step 3 — Generate Plan

The AI analyzes the goal and generates a structured plan.

### Step 4 — Manage Tasks

The user can:

* Complete tasks
* Edit tasks
* Delete tasks
* Change priorities
* Search tasks
* Filter tasks

### Step 5 — Track Progress

The dashboard automatically calculates the user's progress.

---

## User Interface

The application contains a clean productivity dashboard with:

* Goal input area
* AI plan generation
* Task cards
* Priority indicators
* Deadline information
* Progress statistics
* Search and filtering
* Task management controls

The interface is designed to be simple enough for everyday use while maintaining a professional modern appearance.

---

## Challenges During Development

One of the main challenges of this project was integrating AI functionality into a practical web application rather than creating only a static interface.

The project required understanding:

* AI API communication
* Prompt design
* Structured AI responses
* Frontend and backend communication
* Asynchronous JavaScript
* Error handling
* State management
* Local data persistence
* Responsive UI development

Working through these challenges helped improve my understanding of how AI can be integrated into real-world applications.

---

## Future Enhancements

The project can be extended with several features in the future:

* User authentication
* Cloud database
* Multiple AI model support
* Voice-based task creation
* AI-generated daily schedules
* Calendar integration
* Email or push reminders
* Recurring tasks
* Productivity analytics
* Dark mode
* Team collaboration
* Cross-device synchronization
* AI-based task prioritization
* Personalized productivity recommendations

---

## Learning Outcomes

Through this project, I gained practical experience in:

* Prompt Engineering
* AI API Integration
* Web Development
* JavaScript
* Frontend Design
* API Communication
* Task Management Systems
* Responsive UI Development
* Error Handling
* Local Storage
* Git and GitHub

---

## Project Purpose

This project was developed as a practical exploration of **Prompt Engineering, Artificial Intelligence, and Web Development**.

The main objective is to demonstrate how AI can be used to solve a common productivity problem by automatically converting goals into structured and manageable action plans.

---

## Author

**Ajaykumar**

Computer Science and Systems Engineering Student

Interested in:

* Artificial Intelligence
* Prompt Engineering
* Web Development
* Software Development

---

## License

This project is created for educational and learning purposes.

You are free to explore and modify the project for learning and development.
# AI-To-Do-Planner
