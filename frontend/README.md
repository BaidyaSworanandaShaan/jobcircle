A full-stack job portal built with Next.js 13, Node.js (Express), and Prisma ORM, featuring separate dashboards for admin and users, JWT authentication, and role-based access control.
Admins can post and manage jobs, while users can apply for available positions and track their applications.

.env configuration

NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
REFRESH_TOKEN_SECRET="your_secret_key"
ACCESS_TOKEN_SECRET="your_secret_key"
DATABASE_URL="mysql://user:password@localhost:3306/job_portal"

# Installation

1. Clone the repository :
   git clone https://github.com/yourusername/job-portal.git
   cd job-portal

2. Install Dependencies

   Frontend
   npm install

   Backend
   cd backend
   npm install

3. Set up the database
   npx prisma migrate dev

# Run the servers

# Backend

cd backend
npm run dev

# Frontend

cd ..
npm run dev
