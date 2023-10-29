// pages/_app.js
import { ChakraProvider } from '@chakra-ui/react'

//import '@/styles/globals.css'
import { ClerkProvider } from "@clerk/nextjs";


function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
        <ClerkProvider {...pageProps}>
      <Component {...pageProps} />
      </ClerkProvider>
    </ChakraProvider>
  )
}

export default MyApp;