# Utils Package

Shared utility functions for the Personal Coach App platform.

## 📦 Installation

```bash
pnpm add @personal-coach/utils
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

- `src/` - Utility functions
- `dist/` - Compiled JavaScript (generated)

## 🛠️ Utilities

### Date & Time
- `formatDate` - Format dates for display
- `getRelativeTime` - Get relative time (e.g., "2 hours ago")
- `isToday` - Check if date is today
- `getWeekRange` - Get start and end of week

### Validation
- `validateEmail` - Email validation
- `validatePassword` - Password strength validation
- `validatePhone` - Phone number validation

### String Manipulation
- `capitalize` - Capitalize first letter
- `slugify` - Convert string to URL-friendly slug
- `truncate` - Truncate text with ellipsis

### Array & Object
- `groupBy` - Group array items by key
- `sortBy` - Sort array by property
- `pick` - Pick specific properties from object
- `omit` - Omit specific properties from object

### Storage
- `localStorage` - Local storage utilities
- `sessionStorage` - Session storage utilities
- `secureStorage` - Encrypted storage utilities

### API
- `apiClient` - HTTP client with interceptors
- `handleApiError` - Standard error handling
- `retryRequest` - Retry failed requests

### Math
- `calculatePercentage` - Calculate percentage
- `roundToDecimal` - Round to specific decimal places
- `clamp` - Clamp value between min and max

## 🎯 Usage

```tsx
import { formatDate, validateEmail, groupBy } from '@personal-coach/utils';

// Format date
const formattedDate = formatDate(new Date(), 'MMM dd, yyyy');

// Validate email
const isValidEmail = validateEmail('user@example.com');

// Group items
const groupedItems = groupBy(items, 'category');
```

## 🔧 Dependencies

- TypeScript
- date-fns (for date utilities)
- zod (for validation) 