import React from 'react';
import { Toaster } from 'react-hot-toast';

import '../styles/globals.css'
import { Layout } from '../components';
import { StateContext } from '../context/StateContext';

function MyApp({ Component, pageProps }) {
  return (
    //wrapping the component in the layout component
    //gave us the navbar as well as padding and margins fot the banners
    <StateContext>
      <Layout>
        <Toaster />
        <Component {...pageProps} />
      </Layout>
    </StateContext>
    
  )
}

export default MyApp
