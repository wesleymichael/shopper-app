import type { AppProps } from 'next/app';
import '../styles/reset.scss';
import '../styles/global.scss'
import { Header } from '@/components/Header';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
 
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ToastContainer />
      <Header/>
      <Component {...pageProps} /> 
    </>
  );
}
