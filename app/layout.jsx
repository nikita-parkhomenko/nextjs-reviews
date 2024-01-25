import NavBar from '@/components/nav-bar';

import { orbitron, exo2 } from './fonts';
// These styles apply to every route in the application
import './globals.css';

export const metadata = {
  title: {
    default: 'Indie gamer',
    template: '%s | Indie gamer',
  }
}

export default function RootLayout({ children }) {
  return <html lang="en" suppressHydrationWarning={true} className={`${orbitron.variable} ${exo2.variable}`}>
    <body className="flex flex-col px-4 py-2 min-h-screen bg-orange-50">
      <header>
        <NavBar />
      </header>
      <main className="grow py-3">
        {children}
      </main>
      <footer className='text-sm border-t text-center py-3'>
        Game data and images courtesy of{' '}
        <a href="https://rawg.io/" className="text-orange-800 hover:underline">
          RAWG
        </a>
        </footer>
    </body>
  </html>
}
