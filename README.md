# Reward System App for My Second-Grade Daughter

This app is a reward system designed for my second-grade daughter, where she earns stars (which further transition to dollars) for completing extra activities. It includes the following features:

## Features

### Task Management
- Add, delete, and claim tasks.
- Supports sorting, filtering, and confirmation on deletion.

### Balance Updates
- Automatically updates the balance when tasks are claimed.
- Adds money to the balance on specific events (e.g., every Sunday).

### Transaction System
- Includes modals for:
    - **Buying:** Deducts money from the balance with validation.
    - **Adding Money:** Allows for increasing the balance.
- Real-time balance updates with validation and error handling.

### Backend
- Powered by a MongoDB-based API.
- Includes routes for task and transaction management.
- Features server-side validation for secure data handling.

### Frontend
- Built using React and TypeScript.
- User-friendly forms with input validation and responsive design.
- Includes loading states to enhance user experience.