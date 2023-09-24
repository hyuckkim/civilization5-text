// `pages/_app.js`
import { AppProps } from 'next/app';
import 'tailwindcss/tailwind.css';
import '../styles/global.css'

export default function App({ Component, pageProps }: AppProps) {
  return (<>
    <header></header>
    <Component {...pageProps} />
    <footer className='mt-20 border-t-2 border-gray-500'>Civilization 5 - Vox populi v3.9.4</footer>
  </>);
}