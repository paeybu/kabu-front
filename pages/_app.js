/* eslint-disable react/prop-types */
import '../styles/globals.css';
import Head from 'next/head';
import { extendTheme, ChakraProvider } from '@chakra-ui/react';

const theme = extendTheme({
  fonts: {
    heading: 'Kanit',
    body: 'Kanit',
  },
  colors: {
    greenPastel: '#98ddca',
    limePastel: '#d5ecc2',
    creamPastel: '#ffd3b4',
    pinkPastel: '#ffaaa7',
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel='preconnect' href='https://fonts.gstatic.com' />
        <link
          href='https://fonts.googleapis.com/css2?family=Kanit:wght@400;700&display=swap'
          rel='stylesheet'
        />
      </Head>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  );
}

export default MyApp;
