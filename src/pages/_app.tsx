import React, { useContext } from 'react';
import '../styles/global.css';
import { Provider } from 'next-auth/client'

function MyApp({ Component, pageProps }) {

  return (
    <Provider session={pageProps.session}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
