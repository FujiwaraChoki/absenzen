import Head from 'next/head';
import Navbar from '../components/Navbar';
import UserContext from '../context/UserContext';
import SearchModal from '@/components/Search';
import { useState } from 'react';
import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  const [user, setUser] = useState(null);

  return (
    <>
      <Head>
        <title>Absenzen</title>
        <meta name="description" content="Absenzen" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div style={{
        minHeight: '100vh',
      }}>
        <UserContext.Provider value={{ user, setUser }}>
          <Navbar />
          <Component {...pageProps} />
          <SearchModal />
        </UserContext.Provider>
      </div>
    </>
  )
}
