export type KeyboardShortcutDefinition = {
  keys: string[];
  description: string;
  category: 'Global' | 'Navigation' | 'Settings';
};

export const KEYBOARD_SHORTCUTS: KeyboardShortcutDefinition[] = [
  { keys: ['⌘', 'K'], description: 'Open command palette', category: 'Global' },
  { keys: ['⌘', 'S'], description: 'Save current form', category: 'Global' },
  { keys: ['Esc'], description: 'Close modal/dialog', category: 'Global' },
  { keys: ['/'], description: 'Focus search', category: 'Global' },
  { keys: ['?'], description: 'Show keyboard shortcuts', category: 'Global' },
  { keys: ['r'], description: 'Refresh page', category: 'Global' },
  { keys: ['g', 'h'], description: 'Go to Dashboard', category: 'Navigation' },
  { keys: ['g', 'd'], description: 'Go to Dashboard', category: 'Navigation' },
  { keys: ['g', 'i'], description: 'Go to Incidents', category: 'Navigation' },
  { keys: ['g', 's'], description: 'Go to Customers', category: 'Navigation' },
  { keys: ['g', 'u'], description: 'Go to Users', category: 'Navigation' },
  { keys: ['g', 't'], description: 'Go to Teams', category: 'Navigation' },
  { keys: ['g', 'p'], description: 'Go to Profile', category: 'Settings' },
  { keys: ['g', 'e'], description: 'Go to Security', category: 'Settings' },
  { keys: ['g', 'a'], description: 'Go to API Keys', category: 'Settings' },
  { keys: ['g', 'n'], description: 'Go to Notifications', category: 'Settings' },
  { keys: ['g', 'w'], description: 'Go to Workspace', category: 'Settings' },
];
