import type { AppProps } from 'next/app';
import '../styles/reset.scss';
import '../styles/global.scss'
import { Header } from '@/components/Header';
 
export default function App({ Component, pageProps }: AppProps) {
  return (
    <> 
      <Header/>
      <Component {...pageProps} /> 
    </>
  );
}
