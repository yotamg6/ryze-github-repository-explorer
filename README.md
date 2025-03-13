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

3. Set up the environment variables:

Create a `.env` file in the root directory and add:

```
GITHUB_TOKEN=your_personal_access_token_here
```

This token is required to authenticate requests to the GitHub API and avoid hitting rate limits.

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
│   ├── github.js
│   ├── general.js
├── lib/
│   └── cache.js
├── ui/
│   ├── components/
│   │   ├── search-bar/
│   │   │   ├── SearchBar.js
│   │   │   └── search-bar.module.scss
│   │   ├── repository-card/
│   │   │   ├── RepositoryCard.js
│   │   │   └── repository-card.module.scss
│   │   ├── repository-grid/
│   │   │   ├── RepositoryGrid.js
│   │   │   └── repository-grid.module.scss
│   │   ├── sort-button/
│   │   │   ├── SortButton.js
│   │   │   └── sort-button.module.scss
│   │   ├── repo-page/
│   │   │   ├── RepoDetails.js
│   │   │   ├── ContribDetails.js
│   │   │   └── repo-page.module.scss
│   │   ├── RepoDataWrapper.js
```

## Key Features Implementation

### API Routes

- `/api/github/repos` - Fetches repository data
- `/api/github/contributors` - Fetches contributor data

### Caching

The application uses Next.js caching when using `fetch()`. The cache hits and misses can be traced in the terminal.

### Routing

- Main page: `/`
- Repository details: `/repo/[owner]/[name]`

## GitHub API

The application uses the GitHub REST API with authentication. Rate limits apply:

- 5000 requests per hour for authenticated requests

## Notes

- This project uses Next.js App Router for routing and server components
- SCSS modules are used for component-specific styling
- The application maintains state for repositories and sorting functionality
- Error handling is implemented for API failures
- Loading states are displayed during data fetching

