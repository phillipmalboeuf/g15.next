import { motion } from 'framer-motion';
import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import localFont from '@next/font/local';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

/* DECLARE CUSTOM FONTS */
// const editorial = localFont({
//   variable: '--font-editorial',
//   src: [
//     {
//       path: '../public/fonts/PPEditorialNew-Bold.woff2',
//       weight: 'bold',
//       style: 'normal',
//     },
//     {
//       path: '../public/fonts/PPEditorialNew-BoldItalic.woff2', 
//       weight: 'bold',
//       style: 'italic',
//     },
//     {
//       path: '../public/fonts/PPEditorialNew-Italic.woff2',
//       weight: 'normal',
//       style: 'italic',
//     },
//     {
//       path: '../public/fonts/PPEditorialNew-Regular.woff2', 
//       weight: 'normal',
//       style: 'normal',
//     },
//   ],
// })

// const montreal = localFont({
//   variable: '--font-montreal',
//   src: [
//     {
//       path: '../public/fonts/PPNeueMontreal-Bold.woff2', 
//       weight: 'bold',
//       style: 'normal',
//     },
//     {
//       path: '../public/fonts/PPNeueMontreal-BoldItalic.woff2', 
//       weight: 'bold',
//       style: 'italic',
//     },
//     {
//       path: '../public/fonts/PPNeueMontreal-Italic.woff2', 
//       weight: 'normal',
//       style: 'italic',
//     },
//     {
//       path: '../public/fonts/PPNeueMontreal-Medium.woff2',
//       weight: '500',
//       style: 'normal',
//     },
//     {
//       path: '../public/fonts/PPNeueMontreal-Regular.woff2',
//       weight: 'normal',
//       style: 'normal',
//     },
//   ],
// })

export default function App({ Component, pageProps, router }: AppProps) {
  return <main role='main'
    // className={[editorial.variable, montreal.variable].join(' ')}
  >
    {pageProps.navigation && <Header nav={pageProps.navigation.header} social={pageProps.navigation.social} />}
    
    <motion.div key={router.route}
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
    
    {pageProps.navigation && <Footer footer={pageProps.navigation.footer} social={pageProps.navigation.social} legal={pageProps.navigation.legal} />}
  </main>
}
