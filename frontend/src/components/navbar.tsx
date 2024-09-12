import Link from 'next/link';
import { usePathname } from 'next/navigation';

function Navbar() {
  const currentRoute = usePathname();
  console.log('[currentRoute]: ', currentRoute);

  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 ">
        <nav className="flex gap-4">
          <Link
            href="/dashboard"
            className={`text-foreground transition-colors hover:text-foreground`}
          >
            Dashboard
          </Link>
          <Link
            href="/order"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Orders
          </Link>
        </nav>
      </header>
    </div>
  );
}

export default Navbar;
