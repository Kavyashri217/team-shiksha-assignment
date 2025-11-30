# Fullstack SaaS Application

A minimal, responsive fullstack application with authentication and user profile management.

## Tech Stack

**Frontend:**
- Next.js 14 (React)
- CSS with media queries, flexbox, and grid
- Jest & React Testing Library

**Backend:**
- Node.js with Express.js
- PostgreSQL with Prisma ORM
- JWT Authentication
- Jest & Supertest

## Setup Instructions

### Prerequisites
- Node.js 18+ installed
- PostgreSQL database (Neon.tech recommended)

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file (copy from `.env.example`):
```bash
DATABASE_URL="your-neon-postgres-url"
JWT_SECRET="your-secret-key"
PORT=5000
```

4. Generate Prisma client and run migrations:
```bash
npx prisma generate
npx prisma db push
```

5. Start the server:
```bash
npm run dev
```

Backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env.local` file:
```bash
NEXT_PUBLIC_API_URL=http://localhost:5000
```

4. Start the development server:
```bash
npm run dev
```

Frontend will run on `http://localhost:3000`

## Running Tests

**Backend tests:**
```bash
cd backend
npm test
```

**Frontend tests:**
```bash
cd frontend
npm test
```

## Features

### Authentication
- ✅ Sign up with email, password, name, and optional phone
- ✅ Sign in with email and password
- ✅ JWT-based authentication
- ✅ Password hashing with bcrypt

### User Management
- ✅ View user profile information
- ✅ Edit profile (name, phone, bio)
- ✅ Logout functionality

### Validation
- ✅ Email format validation
- ✅ Password minimum length (6 characters)
- ✅ Phone number validation
- ✅ Bio character limit (500 characters)

### UI/UX
- ✅ Minimal, clean SaaS design
- ✅ Fully responsive (mobile, tablet, desktop)
- ✅ Loading states and error handling
- ✅ Success feedback messages

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new user account
- `POST /api/auth/signin` - Authenticate user

### User Profile
- `GET /api/user/profile` - Get current user profile (requires auth)
- `PUT /api/user/profile` - Update user profile (requires auth)

## Database Schema

**User Model:**
```prisma
model User {
  id        String   @id @default(uuid())
  email     String   @unique
  password  String
  name      String
  phone     String?
  bio       String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

## Project Structure

```
fullstack-app/
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── signin/page.js
│   │   │   ├── signup/page.js
│   │   │   ├── dashboard/page.js
│   │   │   └── layout.js
│   │   ├── styles/
│   │   │   └── globals.css
│   │   └── __tests__/
│   │       └── SignIn.test.js
│   ├── next.config.mjs
│   └── package.json
│
└── backend/
    ├── src/
    │   ├── routes/
    │   │   ├── auth.js
    │   │   └── user.js
    │   ├── controllers/
    │   │   ├── authController.js
    │   │   └── userController.js
    │   ├── middleware/
    │   │   └── auth.js
    │   ├── __tests__/
    │   │   └── auth.test.js
    │   └── server.js
    ├── prisma/
    │   └── schema.prisma
    └── package.json
```

## Environment Variables

**Backend (.env):**
- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `PORT` - Server port (default: 5000)

**Frontend (.env.local):**
- `NEXT_PUBLIC_API_URL` - Backend API URL

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- HTTP-only approach (tokens stored in localStorage for demo)
- Input validation on both frontend and backend
- SQL injection protection with Prisma

## Responsive Design

The application uses CSS media queries, flexbox, and grid to provide optimal viewing experience across devices:

- **Mobile** (<768px): Single column layout, stacked forms
- **Tablet** (768px-1024px): Two-column info grid, improved spacing
- **Desktop** (>1024px): Full layout with maximum widths, optimized spacing

## Testing

**Backend Tests:**
- Authentication endpoints (signup, signin)
- Validation error handling
- Password security

**Frontend Tests:**
- Component rendering
- Form interactions
- Error message display
- API integration

## Development Notes

1. Use Neon.tech for easy PostgreSQL hosting
2. Remember to run `npx prisma generate` after schema changes
3. Keep JWT_SECRET secure and never commit it
4. Frontend uses localStorage for token storage (consider httpOnly cookies for production)

## Production Deployment

1. Set up production PostgreSQL database
2. Update environment variables
3. Build frontend: `npm run build`
4. Use process manager like PM2 for backend
5. Configure reverse proxy (nginx) for production
6. Enable HTTPS
7. Consider using httpOnly cookies instead of localStorage for tokens

