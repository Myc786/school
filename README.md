# School Management System

A modern and user-friendly school admission and attendance management website built with Next.js, Tailwind CSS, and Sanity CMS.

## Features

- Modern and responsive design
- Admission form with file upload
- Attendance tracking system
- Admin dashboard
- Role-based authentication
- Email notifications
- SEO optimized

## Tech Stack

- Next.js 13+ with App Router
- TypeScript
- Tailwind CSS
- Sanity CMS
- Next Auth (for authentication)

## Prerequisites

- Node.js 16.8 or later
- npm or yarn
- Sanity account

## Getting Started

1. Clone the repository
```bash
git clone <repository-url>
cd school-management
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
Create a `.env.local` file in the root directory and add the following variables:
```
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-17
```

4. Set up Sanity
```bash
npm create sanity@latest
```
Follow the prompts to set up your Sanity project.

5. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `/src/app` - Next.js app router pages
- `/src/components` - Reusable React components
- `/src/lib` - Utility functions and configurations
- `/sanity` - Sanity schema and configuration
- `/public` - Static assets

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details
