import { Keyboard } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/shadcn/card';
import { KEYBOARD_SHORTCUTS } from '@/lib/keyboard-shortcuts';

export default function KeyboardShortcutsPage() {
  const categories = Array.from(new Set(KEYBOARD_SHORTCUTS.map(shortcut => shortcut.category)));

  return (
    <main className="container mx-auto max-w-5xl py-8">
      <div className="mb-8 flex items-start gap-4">
        <div className="rounded-xl bg-primary/10 p-3 text-primary">
          <Keyboard className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Keyboard Shortcuts</h1>
          <p className="mt-2 text-muted-foreground">
            Navigate OpsKnight and perform common actions without leaving the keyboard.
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {categories.map(category => (
          <Card key={category} className="h-fit">
            <CardHeader>
              <CardTitle>{category}</CardTitle>
              <CardDescription>{category} keyboard commands</CardDescription>
            </CardHeader>
            <CardContent className="space-y-1">
              {KEYBOARD_SHORTCUTS.filter(shortcut => shortcut.category === category).map(
                shortcut => (
                  <div
                    key={`${shortcut.category}-${shortcut.keys.join('-')}`}
                    className="flex items-center justify-between gap-4 border-b py-3 last:border-b-0"
                  >
                    <span className="text-sm">{shortcut.description}</span>
                    <div className="flex shrink-0 items-center gap-1">
                      {shortcut.keys.map((key, index) => (
                        <kbd
                          key={`${key}-${index}`}
                          className="min-w-7 rounded-md border bg-muted px-2 py-1 text-center font-mono text-xs font-semibold shadow-sm"
                        >
                          {key}
                        </kbd>
                      ))}
                    </div>
                  </div>
                )
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <p className="mt-6 text-sm text-muted-foreground">
        Press <kbd className="rounded border bg-muted px-2 py-1 font-mono text-xs">?</kbd> from
        anywhere in OpsKnight to open the shortcuts dialog.
      </p>
    </main>
  );
}
