import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tetherite Demos",
  description: "Demos for Tetherite hooks and components",
};

const NavLink = ({
  href,
  label,
}: {
  href: string;
  label: string;
}) => {
  return <Link className="block py-0.5 px-2 -mx-2 rounded transition-all duration-75 hover:bg-neutral-100" href={href}>{label}</Link>;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex items-center justify-center">
          <div className="hidden md:block flex-none w-full max-w-xs border-r border-neutral-300 h-dvh overflow-auto p-6">
            <div className="text-lg font-bold">Demos</div>
            <ul className="space-y-1.5 mt-4">
              <li><NavLink href="/demos/use-debounce" label="useDebounce" /></li>
              <li><NavLink href="/demos/use-input" label="useInput" /></li>
              <li><NavLink href="/demos/use-localstorage" label="useLocalStorage" /></li>
              <li><NavLink href="/demos/use-mouse" label="useMouse" /></li>
              <li><NavLink href="/demos/use-shortcut" label="useShortcut" /></li>
              <li><NavLink href="/demos/use-toggle" label="useToggle" /></li>
            </ul>
          </div>
          <div className="flex-1">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
