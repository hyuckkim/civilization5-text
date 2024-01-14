import { baseVersion, vpVersion } from '@/db';
import './globals.css';

export const metadata = {
  title: 'Civilization5-text',
  description: 'parse text as civilization 5 format',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <header></header>
        {children}
        <footer className='hidden md:block mt-20 border-t-2 border-gray-500'>Civilization 5 {baseVersion} - Vox populi {vpVersion}</footer>
      </body>
    </html>
  )
}
