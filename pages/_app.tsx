import type { AppProps } from 'next/app';
import '~/styles/globals.css';

function Linker({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default Linker;
