import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

function Navbar() {
  const currentRoute = usePathname();

  console.log('[currentRoute]: ', currentRoute);

  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 ">
        <nav className="flex gap-6">
          <Link
            href="/"
            className={cn(
              `text-muted-foreground transition-colors hover:text-foreground`,
              currentRoute === '/' && 'text-foreground font-bold'
            )}
          >
            Dashboard
          </Link>
          <Link
            href="/order"
            className={cn(
              `text-muted-foreground transition-colors hover:text-foreground`,
              currentRoute === '/order' && 'text-foreground font-bold'
            )}
          >
            Orders
          </Link>
        </nav>
      </header>
    </div>
  );
}

export default Navbar;
