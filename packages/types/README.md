# Types Package

Shared TypeScript type definitions for the Personal Coach App platform.

## 📦 Installation

```bash
pnpm add @personal-coach/types
```

## 🚀 Development

```bash
# Install dependencies
pnpm install

# Build package
pnpm build

# Watch for changes
pnpm dev
```

## 📁 Structure

- `src/` - TypeScript type definitions
- `dist/` - Compiled JavaScript (generated)

## 🏗️ Type Definitions

### User Types
- `User` - User profile information
- `UserProfile` - Extended user profile
- `UserSettings` - User preferences and settings

### Journal Types
- `JournalEntry` - Daily journal entry
- `JournalPrompt` - Guided journaling prompts
- `MindPractice` - Mind practice session

### Relationship Types
- `Relationship` - Relationship data
- `RepairRitual` - Relationship repair activities
- `Letter` - Personal letter content

### Health Types
- `MealPlan` - Meal planning data
- `MovementLog` - Physical activity tracking
- `HealthMetrics` - Health measurements

### Life Compass Types
- `Value` - Personal values
- `Boundary` - Personal boundaries
- `Purpose` - Life purpose statement
- `Role` - Life roles and commitments

### App Types
- `AppState` - Global application state
- `Navigation` - Navigation state
- `Theme` - UI theme configuration

## 🎯 Usage

```tsx
import type { User, JournalEntry, Relationship } from '@personal-coach/types';

function MyComponent({ user }: { user: User }) {
  const journalEntry: JournalEntry = {
    id: '1',
    userId: user.id,
    content: 'Today I...',
    createdAt: new Date(),
    mood: 'grateful'
  };
  
  return <div>{journalEntry.content}</div>;
}
```

## 🔧 Dependencies

- TypeScript
- Zod (for runtime validation) 