import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ProfileDetails from './profileDetails';

function Navbar() {
  const currentRoute = usePathname();

  console.log('[currentRoute]: ', currentRoute);

  return (
    <div className="flex w-full flex-col justify-between">
      <header className="sticky top-0 flex h-16 justify-between items-center gap-4 border-b bg-background px-12 ">
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
        <ProfileDetails />
      </header>
    </div>
  );
}

export default Navbar;
