# hiob-app

Web application for the HIOB project - exploring the Book of Job in Early Medieval Jewish Literature.

## Prerequisites

- **Node.js**
- **uv** - Python package manager ([installation](https://docs.astral.sh/uv/getting-started/installation/))

## Setup

```bash
# Install Node dependencies
npm install

# Fetch data from hiob-data repository
# uv automatically handles Python dependencies from pyproject.toml
uv run fetch_data.py

# Start development server
npm run dev
# or start the server and open the app in a new browser tab
npm run dev -- --open


# Build for production
npm run build 
# Preview production build
npm run preview
```
## Tech Stack

- SvelteKit
- shadcn-svelte - UI components
- Tailwind CSS