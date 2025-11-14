# Hostify - Student Hostel Management System

## Overview

Hostify is a comprehensive hostel management system designed to streamline student accommodation processes. It provides features for room allocation, mess management, complaint handling, and more.

## Features

- User Authentication (Registration & Login)
- Room Allocation Management
- Mess Menu Management
- Room Switch Requests
- Complaint Management
- Contact System

## Tech Stack

- **Frontend Framework**: React with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: React Query
- **Form Handling**: React Hook Form with Zod validation
- **Routing**: React Router
- **Storage**: LocalStorage (for user data)

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd hostify
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/         # Route-based components
├── lib/          # Utilities and shared code
├── hooks/        # Custom React hooks
└── App.tsx       # Main application component
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint



This project is licensed under the MIT License - see the LICENSE file for details.
