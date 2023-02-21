import { motion } from 'framer-motion';
import '../styles/globals.scss';
import type { AppProps } from 'next/app';
//import { Inter } from '@next/font/google';
import localFont from '@next/font/local';

/* DECLARE CUSTOM FONTS */
//const inter = Inter({ subsets: ['latin'] })
const customFont = localFont({
  src: [
    {
      path: '../public/fonts/PPEditorialNew-Bold.woff2',
    },
    {
      path: '../public/fonts/PPEditorialNew-BoldItalic.woff2', 
    },
    {
      path: '../public/fonts/PPEditorialNew-Italic.woff2', 
    },
    {
      path: '../public/fonts/PPEditorialNew-Regular.woff2', 
    },
    {
      path: '../public/fonts/PPNeueMontreal-Bold.woff2', 
    },
    {
      path: '../public/fonts/PPNeueMontreal-BoldItalic.woff2', 
    },
    {
      path: '../public/fonts/PPNeueMontreal-Italic.woff2', 
    },
    {
      path: '../public/fonts/PPNeueMontreal-Medium.woff2', 
    },
    {
      path: '../public/fonts/PPNeueMontreal-Regular.woff2', 
    },
  ],
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    /* USE CUSTOM FONTS */
    /* PAGE TRANSITIONS */
    <motion.div
      className={customFont.className}
      //className={inter.className}
      initial="pageInitial" 
      animate="pageAnimate" 
      variants={{
        pageInitial: {
          opacity: 0
        },
        pageAnimate: {
          opacity: 1
        },
    }}>
      <Component {...pageProps} />
    </motion.div>
  );
}
