# Backend Services

Backend services and Supabase helpers for the Personal Coach App platform.

## 🚀 Development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build
```

## 📁 Structure

- `src/` - Backend source code
- `src/supabase/` - Supabase client and helpers
- `src/api/` - API routes and handlers
- `src/db/` - Database schemas and migrations
- `src/auth/` - Authentication helpers
- `src/realtime/` - Real-time features
- `src/storage/` - File storage helpers

## 🔧 Services

### Supabase Client
- Database connection and queries
- Authentication management
- Real-time subscriptions
- File storage operations

### API Routes
- User management
- Journal entries
- Relationship data
- Health tracking
- Life compass data

### Database Schemas
- Users table
- Journal entries table
- Relationships table
- Health metrics table
- Life compass table

### Authentication
- User registration
- Login/logout
- Password reset
- Social authentication
- Session management

### Real-time Features
- Live journal updates
- Relationship status changes
- Health goal progress
- Community notifications

## 🗄️ Database Schema

### Users
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Journal Entries
```sql
CREATE TABLE journal_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  content TEXT NOT NULL,
  mood TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Relationships
```sql
CREATE TABLE relationships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  name TEXT NOT NULL,
  type TEXT,
  status TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## 🔗 Dependencies

- Supabase
- PostgreSQL
- Node.js
- TypeScript
- Express (if needed for custom API routes) 