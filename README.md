# Personal Coach App

A comprehensive platform for deep personal transformation, built for repairing relationships, reclaiming health, rediscovering purpose, and rebuilding legacy.

## 🏗️ Architecture

This is a monorepo built with pnpm workspaces containing:

- **`apps/web`** - Next.js web application
- **`apps/mobile`** - React Native mobile application (via Expo)
- **`packages/ui`** - Shared UI components
- **`packages/types`** - Shared TypeScript types
- **`packages/utils`** - Shared utilities
- **`backend`** - Supabase helpers and backend services

## 🚀 Quick Start

```bash
# Install dependencies
pnpm install

# Start development servers
pnpm dev

# Build all packages
pnpm build
```

## 📱 Apps

### Web App
```bash
cd apps/web
pnpm dev
```

### Mobile App
```bash
cd apps/mobile
pnpm start
```

## 🧩 Packages

### UI Components
```bash
cd packages/ui
pnpm build
```

### Types
```bash
cd packages/types
pnpm build
```

### Utils
```bash
cd packages/utils
pnpm build
```

## 🔧 Tech Stack

- **Frontend**: React + Next.js (Web), React Native + Expo (Mobile)
- **State Management**: Zustand
- **Backend**: Supabase (Postgres, Auth, Realtime)
- **UI**: Tailwind CSS (Web), NativeBase (Mobile)
- **Package Manager**: pnpm
- **Monorepo**: pnpm workspaces

## 📋 Development Phases

1. **Foundation** - Self-awareness, relationship repair, basic body care
2. **Rebuild** - Reconnection tools, health enhancement, life compass
3. **Launchpad** - Reputation repair, blueprint sharing, community

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Run tests and linting
4. Submit a pull request

## 📄 License

MIT
