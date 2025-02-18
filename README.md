# GitHub Repository Explorer

A simple application that allows users to search for GitHub repositories by username, view repository details, and explore contributor information.

## Features

- Search for GitHub repositories by username
- Display repository information including:
  - Repository name
  - Description
  - Star count
  - Programming language
- Sort repositories by stars
- View detailed repository information including:
  - Last updated date
  - "View on GitHub" link
  - Top contributors with avatars and commit counts
- Caching implementation to avoid redundant API calls
- Responsive design for various screen sizes

## Tech Stack

- Next.js 14 (App Router)
- SCSS Modules for styling
- GitHub REST API

## Prerequisites

- Node.js 14.0 or later
- npm (Node Package Manager)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yotamg6/ryze-github-repository-explorer
cd ryze-github-repository-explorer
```

2. Install dependencies:

```bash
npm install
```

The project requires the following dependencies which will be installed:

- `sass` - For SCSS processing

## Running the Application

To run the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── github/
│   │       ├── repos/
│   │       │   └── route.js
│   │       └── contributors/
│   │           └── route.js
│   ├── repo/
│   │   └── [owner]/
│   │       └── [name]/
│   │           └── page.js
│   └── page.js
├── config/
│   └── github.js
├── lib/
│   └── cache.js
└── ui/
    └── components/
        ├── search-bar/
        │   ├── search-bar.js
        │   └── search-bar.module.scss
        ├── repository-card/
        │   ├── repository-card.js
        │   └── repository-card.module.scss
        ├── repository-grid/
        │   ├── repository-grid.js
        │   └── repository-grid.module.scss
        └── sort-button/
            ├── sort-button.js
            └── sort-button.module.scss
```

## Key Features Implementation

### API Routes

- `/api/github/repos` - Fetches repository data
- `/api/github/contributors` - Fetches contributor data

### Caching

The application implements server-side caching to minimize API calls to GitHub. Cache duration is set to 5 minutes.

### Routing

- Main page: `/`
- Repository details: `/repo/[owner]/[name]`

## GitHub API

The application uses the GitHub REST API without authentication. Rate limits apply:

- 60 requests per hour for unauthenticated requests

## Notes

- This project uses Next.js App Router for routing and server components
- SCSS modules are used for component-specific styling
- The application maintains state for repositories and sorting functionality
- Error handling is implemented for API failures
- Loading states are displayed during data fetching

