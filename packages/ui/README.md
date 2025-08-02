# UI Components Package

Shared UI components for the Personal Coach App platform.

## 📦 Installation

```bash
pnpm add @personal-coach/ui
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

- `src/components/` - React components
- `src/hooks/` - Custom React hooks
- `src/utils/` - Component utilities
- `src/types/` - Component type definitions

## 🎨 Components

### Form Components
- `Button` - Primary, secondary, and variant buttons
- `Input` - Text input with validation
- `Textarea` - Multi-line text input
- `Select` - Dropdown selection
- `Checkbox` - Checkbox input
- `Radio` - Radio button group

### Layout Components
- `Card` - Content container
- `Modal` - Overlay dialog
- `Drawer` - Side panel
- `Tabs` - Tab navigation
- `Accordion` - Collapsible content

### Feedback Components
- `Alert` - Success, error, warning messages
- `Toast` - Notification messages
- `Progress` - Progress indicators
- `Spinner` - Loading spinner

### Navigation Components
- `Breadcrumb` - Navigation breadcrumbs
- `Pagination` - Page navigation
- `Menu` - Dropdown menu

## 🎯 Usage

```tsx
import { Button, Card, Input } from '@personal-coach/ui';

function MyComponent() {
  return (
    <Card>
      <Input placeholder="Enter your name" />
      <Button variant="primary">Submit</Button>
    </Card>
  );
}
```

## 🔧 Dependencies

- React
- TypeScript
- Tailwind CSS (for web)
- NativeBase (for mobile) 