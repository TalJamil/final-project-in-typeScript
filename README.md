# TaskWeb List Application

This project is a TypeScript-based **TaskWeb List application** designed as part of a software engineering assignment. It showcases advanced TypeScript features, integration with external APIs, and React-based SPA functionality.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Integration](#api-integration)
- [Project Structure](#project-structure)
- [Contribution](#contribution)

## Features

1. **Task Management**:
   - Add new tasks with a name and optional description.
   - Mark tasks as completed or uncompleted with a visual indication (strikethrough).
   - Delete tasks from the list.

2. **Task Filtering**:
   - View all tasks.
   - Filter tasks to show only completed or uncompleted tasks.

3. **Persistent Storage**:
   - Store tasks using `LocalStorage`, ensuring data is retained across page reloads.

4. **Motivational Quotes**:
   - Fetch and display a motivational quote above the task list from an external API.

5. **Responsive Design**:
   - Simple and user-friendly UI with basic styling.

## Technologies Used

- **TypeScript**: Ensuring type safety and robust code.
- **React**: For building the user interface.
- **Vite**: For a fast development environment.
- **Tailwind CSS**: For styling.
- **API Integration**: Using `fetch` or `axios` to interact with external APIs.

## Installation

To get started, follow these steps:

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## Usage

### Adding a Task
1. Enter a task name in the input field.
2. Optionally, add a description.
3. Click the **Add Task** button to add it to the list.

### Managing Tasks
- Mark tasks as completed by clicking on them.
- Delete tasks using the delete button.

### Filtering Tasks
- Use the provided filter buttons (**All**, **Completed**, **Uncompleted**) to filter tasks.

### Motivational Quotes
- A motivational quote will be displayed at the top of the page, fetched from an external API.

## API Integration

The application integrates with the [Quotable API](http://api.quotable.io/random) to fetch motivational quotes. 

### Example API Response:
```json
{
  "content": "The only limit to our realization of tomorrow is our doubts of today.",
  "author": "Franklin D. Roosevelt"
}
```

### Error Handling:
- The app handles errors gracefully and provides feedback if the API call fails.

## Project Structure

```
src/
|-- components/
|   |-- TaskList.tsx
|   |-- TaskItem.tsx
|   |-- QuoteBox.tsx
|-- App.tsx
|-- index.tsx
|-- styles/
|   |-- tailwind.css
```

- **`components/`**: Contains reusable React components like `TaskList` and `QuoteBox`.
- **`App.tsx`**: Main application component.
- **`styles/`**: Contains styling files.

## Contribution

If you'd like to contribute:

1. Fork the repository.
2. Create a new feature branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add feature description"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

## License

This project is for educational purposes and is not licensed for production use.

---

Enjoy building and extending this project!
