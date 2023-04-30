import type { GetServerSideProps, NextPage } from 'next'
import { Network, Alchemy } from 'alchemy-sdk';
import Link from "next/link";
import { Attributes, NFTs, Product } from '../models/models';
import { type } from 'os';
import ProductComponent from '../components/ProductComponent';
import NavbarComponent from '../components/NavbarComponent';
import FooterComponent from '../components/FooterComponent';
import styles from '../styles/Home.module.css'


/*

interface ProductPageProps {
  products: Product[]
}

*/

/*
async function loadProducts() {
  const settings = {
    apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY, //"wQhhyq4-jQcPzFRui3PljR6pzRwd5N_n",
    network: Network.ETH_SEPOLIA,
  };

  // init with key and chain info 
  const alchemy = new Alchemy(settings);
  // Print total NFT collection returned in the response:
  const { nfts } = await alchemy.nft.getNftsForContract("0x76b41A6b4f4F53F8d15163FBC23b9C2B306b48DA")
  const loadedProducts = nfts
  return loadedProducts 
}
*/
export const getServerSideProps: GetServerSideProps = async () => {
  
  const settings = {
    apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY, //"wQhhyq4-jQcPzFRui3PljR6pzRwd5N_n",
    network: Network.ETH_SEPOLIA,
  };

  // init with key and chain info 
  const alchemy = new Alchemy(settings);
  // Print total NFT collection returned in the response:
  const { nfts } = await alchemy.nft.getNftsForContract("0x7EE7b26C25Ea618E6223cCc3c79D5e7259f1A930")
  const loadedProducts = JSON.stringify(nfts)
  // console.log(nfts) 
  // Pass data to the page via props
  return { props: { loadedProducts } }
}

const ProductsPage: NextPage <{ loadedProducts: string }> = ({ loadedProducts }) => {
  
  const loadProducts = (JSON.parse(loadedProducts))
  console.log(loadProducts) 

  
  

  return (
    <>
      <div>
        <div>
          <div>
            <NavbarComponent/>
          </div>
          <div className={styles.container}>
            <div className={styles.wrapper}>
              <div className={styles.products}>
                {loadProducts.map(( product: Product) =>(
                  <ProductComponent product={product} key={product.tokenId}/>
                ))}
              </div>    
            </div>
          </div>
          
          <div>
            <FooterComponent/>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductsPage


// unused snippets
//import { useEffect } from 'react';

//import { SDK, Auth } from '@infura/sdk';
//<Rentals item={item} key={item.tokenId}/> 
/*

{ products.map((product : Product)=>(
          <Link href="/">
              <p>{product.name}</p>
          </Link>
        ))}


const auth = new Auth({
  projectId: process.env.INFURA_API_KEY,
  secretId: process.env.INFURA_API_KEY_SECRET,
  privateKey: process.env.WALLET_PRIVATE_KEY,
  chainId: 1115511

})
*/
//const sdk = new SDK(auth);


/*
  useEffect(()=>{
    async function loadProducts() {
      const settings = {
        apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY, //"wQhhyq4-jQcPzFRui3PljR6pzRwd5N_n",
        network: Network.ETH_SEPOLIA,
      };
    
      const alchemy = new Alchemy(settings);
      // Print total NFT collection returned in the response:
      const loadedProducts = await alchemy.nft.getNftsForContract("0x76b41A6b4f4F53F8d15163FBC23b9C2B306b48DA")
      console.log(loadedProducts)
    }
    loadProducts()
  },[])
  */

  /*
<div key={product.tokenId}>
          <img src={product.media[0].gateway} alt="" />
          {product.description}
          <br/>
          {(product.rawMetadata.attributes).map((attributes: Attributes)=>(
            <div key={attributes.trait_type}>
              {attributes.trait_type}

            </div>
          ))}
        </div>
  */