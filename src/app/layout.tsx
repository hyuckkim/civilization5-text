export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
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
        <footer className='mt-20 border-t-2 border-gray-500'>Civilization 5 - Vox populi v3.10.12</footer>
      </body>
    </html>
  )
}
