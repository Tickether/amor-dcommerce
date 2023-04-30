import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/react'
import { configureChains, createClient, WagmiConfig } from 'wagmi'
import { sepolia, mainnet, polygon } from 'wagmi/chains'
import { useEffect, useState } from 'react'
import { RecoilRoot } from 'recoil'
import { ToastProvider } from 'react-toast-notifications'



if (!(process.env.NEXT_PUBLIC_W3M_PROJECT_ID)) {
  throw new Error("You need to provide NEXT_PUBLIC_W3M_PROJECT_ID env variable");
}

const projectId = process.env.NEXT_PUBLIC_W3M_PROJECT_ID;

const chains = [sepolia, mainnet, polygon];

// Wagmi client
const { provider } = configureChains(chains, [
  w3mProvider({ projectId }),
]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors: w3mConnectors({
    version: 1,
    chains,
    projectId 
  }),
  provider,
});

const ethereumClient = new EthereumClient(wagmiClient, chains);


function MyApp({ Component, pageProps }: AppProps) {
  
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);



  return (
    <>
      { ready ? (
        <WagmiConfig client={wagmiClient}>
          <RecoilRoot>
            <ToastProvider>
              <Component {...pageProps} />
            </ToastProvider>
          </RecoilRoot>
        </WagmiConfig>
      ) : (
        null
      )}
      

      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </>
      
  );
}

export default MyApp
