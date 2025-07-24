# Todo App - Full Stack Monorepo

A comprehensive todo application built with modern technologies using Turborepo monorepo architecture.

## 🚀 Tech Stack

### Backend
- **NestJS** - Progressive Node.js framework
- **Prisma** - Next-generation ORM
- **PostgreSQL** - Powerful, open source object-relational database
- **JWT** - JSON Web Token for authentication
- **Passport** - Authentication middleware
- **Jest** - Testing framework
- **Swagger** - API documentation

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Static type checking
- **Tailwind CSS v4** - Utility-first CSS framework
- **shadcn/ui** - Beautiful, accessible components
- **TanStack Query** - Data fetching and caching
- **React Hook Form** - Performant forms with validation
- **Zod** - TypeScript-first schema validation
- **Testing Library** - Simple and complete testing utilities

### Infrastructure
- **Turborepo** - High-performance build system for monorepos
- **Docker** - Containerization
- **ESLint** - Code linting
- **Prettier** - Code formatting

## 📁 Project Structure

```
todo-app-monorepo/
├── apps/
│   ├── backend/           # NestJS API
│   │   ├── src/
│   │   │   ├── auth/      # Authentication module
│   │   │   ├── users/     # Users module
│   │   │   ├── todos/     # Todos module
│   │   │   └── prisma/    # Prisma service
│   │   ├── prisma/        # Database schema and migrations
│   │   └── test/          # Backend tests
│   └── frontend/          # Next.js application
│       ├── src/
│       │   ├── app/       # App Router pages
│       │   ├── components/# Reusable components
│       │   ├── lib/       # Utilities and API clients
│       │   └── providers/ # Context providers
│       └── __tests__/     # Frontend tests
├── packages/              # Shared packages (future)
├── turbo.json            # Turborepo configuration
└── package.json          # Root package.json
```

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (>= 18.0.0)
- npm or yarn
- PostgreSQL database
- Git

### 1. Clone the Repository
```bash
git clone <repository-url>
cd todo-app-monorepo
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup

#### Backend Environment (.env)
Create `apps/backend/.env`:
```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/todo_app"

# JWT Secret
JWT_SECRET="your-super-secret-jwt-key"

# Server Configuration
PORT=3001
NODE_ENV=development

# Frontend URL (for CORS)
FRONTEND_URL="http://localhost:3000"
```

#### Frontend Environment (.env.local)
Create `apps/frontend/.env.local`:
```env
NEXT_PUBLIC_API_URL="http://localhost:3001"
```

### 4. Database Setup
```bash
# Generate Prisma client
npm run db:generate

# Push database schema
npm run db:push

# Or run migrations (recommended for production)
npm run db:migrate
```

### 5. Start Development Servers
```bash
# Start both frontend and backend
npm run dev

# Or start individually
cd apps/backend && npm run dev
cd apps/frontend && npm run dev
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001
- API Documentation: http://localhost:3001/api/docs

## 📚 API Documentation

### Authentication Endpoints

#### POST /api/auth/register
Register a new user
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword"
}
```

#### POST /api/auth/login
Login user
```json
{
  "email": "john@example.com",
  "password": "securepassword"
}
```

#### GET /api/auth/profile
Get current user profile (requires authentication)

### Todo Endpoints

#### GET /api/todos
Get user's todos with pagination and filtering
Query parameters:
- `completed`: boolean (default: false)
- `page`: number (default: 1)
- `limit`: number (default: 10)
- `sortBy`: 'date' | 'priority' | 'createdAt' (default: 'date')
- `sortOrder`: 'asc' | 'desc' (default: 'desc')
- `search`: string (filter by description)
- `priority`: 'LOW' | 'MEDIUM' | 'HIGH'

#### POST /api/todos
Create a new todo
```json
{
  "description": "Complete project documentation",
  "priority": "HIGH",
  "date": "2024-01-15T10:00:00Z"
}
```

#### GET /api/todos/:id
Get a specific todo

#### PATCH /api/todos/:id
Update a todo
```json
{
  "description": "Updated description",
  "priority": "MEDIUM",
  "completed": true,
  "pinned": false
}
```

#### DELETE /api/todos/:id
Delete a todo

#### PATCH /api/todos/:id/pin
Toggle pin status of a todo

#### GET /api/todos/stats
Get user's todo statistics

## 🧩 Frontend Components

### Core Components

#### `<TodoItem />` - Custom Todo Component
Props:
```typescript
interface TodoItemProps {
  todo: Todo;
  onUpdate: (id: string, data: UpdateTodoRequest) => void;
  onDelete: (id: string) => void;
  onTogglePin: (id: string) => void;
}
```

#### `<Input />` - Reusable Input Component
Props:
```typescript
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}
```

#### `<Button />` - Interactive Button Component
Props:
```typescript
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  asChild?: boolean;
}
```

### Feature Components

#### `<SearchBar />` - Debounced Search
Features debounced search with 300ms delay for optimal performance.

#### `<TodoFilters />` - Filtering and Sorting
Provides priority filtering, sorting options, and pagination controls.

#### `<TodoStats />` - Statistics Dashboard
Displays comprehensive todo statistics and progress indicators.

## 🧪 Testing

### Backend Tests
```bash
cd apps/backend

# Run all tests
npm run test

# Run tests with coverage
npm run test:cov

# Run specific test files
npm run test -- todos.service.spec.ts
```

### Frontend Tests
```bash
cd apps/frontend

# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## 🚀 Deployment

### Using Docker

#### Backend
```dockerfile
# apps/backend/Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npx prisma generate
RUN npm run build
EXPOSE 3001
CMD ["npm", "run", "start:prod"]
```

#### Frontend
```dockerfile
# apps/frontend/Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Environment Variables for Production

#### Backend
```env
DATABASE_URL="postgresql://user:pass@db:5432/todo_app"
JWT_SECRET="your-production-jwt-secret"
NODE_ENV="production"
PORT=3001
FRONTEND_URL="https://your-frontend-domain.com"
```

#### Frontend
```env
NEXT_PUBLIC_API_URL="https://your-api-domain.com"
```

## ✨ Features Implemented

### Core Requirements ✅
- [x] NestJS backend with Prisma ORM
- [x] PostgreSQL database
- [x] Next.js frontend with App Router
- [x] TypeScript throughout
- [x] Authentication system (register/login)
- [x] CRUD operations for todos
- [x] Todo properties (description, priority, date, completed)
- [x] User-specific todos with security
- [x] Responsive design
- [x] Error handling
- [x] Custom components (TodoItem, Input, Button)

### Bonus Features ✅
- [x] **TanStack Query** for data caching and management
- [x] **Debounced search** bar (300ms delay)
- [x] **Pin tasks** to top of list
- [x] **Backend tests** (Jest) for services and controllers
- [x] **Frontend tests** (Testing Library) for components
- [x] **Detailed README** with API documentation
- [x] **Good UI/UX** with shadcn/ui and consistent theming
- [x] **Pagination** for task lists
- [x] **Sorting** by priority, date, and completion status
- [x] **Stateless architecture** with server components
- [x] **Statistics dashboard** with todo insights

## 🎯 Performance Optimizations

- **Server Components**: Maximum use of Next.js server components
- **Data Caching**: TanStack Query for efficient data management
- **Database Indexing**: Optimized Prisma schema with indexes
- **Debounced Search**: Reduces API calls during user input
- **Pagination**: Efficient data loading for large todo lists
- **Stateless Design**: Improved scalability and performance

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcryptjs for secure password storage
- **Route Guards**: Protected API endpoints
- **User Isolation**: Users can only access their own todos
- **Input Validation**: Zod schemas and class-validator
- **CORS Configuration**: Secure cross-origin requests

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes with descriptive messages
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- NestJS team for the excellent framework
- Vercel team for Next.js and the App Router
- Prisma team for the amazing ORM
- shadcn for the beautiful UI components
- TanStack team for the powerful query library