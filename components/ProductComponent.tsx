import styles from '../styles/Product.module.css'
import Link from "next/link";
//import Image from 'next/image';
import { Attributes, Product } from "../models/models";
import { useAccount, useContractRead, useContractWrite } from "wagmi";
import { BigNumber, ethers } from 'ethers';
import { useRecoilState } from 'recoil'
import { CartProps, cartState } from "../atom/cartState";
import { useToasts } from 'react-toast-notifications';
import { useEffect, useState } from 'react';
//import { CartProps } from '../atom/cartState';


interface ProductProps {
    product: Product
}







const ProductComponent = ({product}: ProductProps) => {

    

    const [cartItem, setCartItem] = useRecoilState(cartState)

    const {address, isConnected} = useAccount()

    const { addToast } = useToasts();

    const [etherPrice, setEtherPrice] = useState<string>()

    const contractReadFee = useContractRead({
        address: "0x7EE7b26C25Ea618E6223cCc3c79D5e7259f1A930",
        abi: [
            {
              name: 'getLatestPrice',
              inputs: [{ internalType: "uint256", name: "id", type: "uint256" }],
              outputs: [{ internalType: "int256", name: "", type: "int256" }],
              stateMutability: 'view',
              type: 'function',
            },
            
          ],
        functionName: 'getLatestPrice',
        args: [BigNumber.from(product.tokenId)],
        chainId: 11155111,
    })

    const getLatestPrice  = (contractReadFee?.data!)
    const latestPrice = (getLatestPrice?._hex!)

    useEffect(() => {
        // empty effect
        if(latestPrice){
            setEtherPrice(ethers.utils.formatEther(latestPrice))
        }
      }, [latestPrice]);
    

    console.log((getLatestPrice))

    const  contractWrite = useContractWrite({
        mode: 'recklesslyUnprepared',
        address: "0x7EE7b26C25Ea618E6223cCc3c79D5e7259f1A930",
        abi: [
            {
              name: 'buy',
              inputs: [ {internalType: "address", name: "to", type: "address"}, {internalType: "uint256", name: "id", type: "uint256"}, {internalType: "uint256", name: "amount", type: "uint256" } ],
              outputs: [],
              stateMutability: 'payable',
              type: 'function',
            },
        ],
        functionName: "buy",
        args: [ (address!), (BigNumber.from(product.tokenId)), (BigNumber.from(1))],
        overrides: {
            value: getLatestPrice,
        },
        chainId: 11155111,
    })

    const handleBuy = async () => {
        try {
          await contractWrite.writeAsync?.()
        } catch (err) {
          console.log(err)
        }
    }

    const handleCartAdd = async () => {
        //const 
        try {
            if (cartItem.findIndex(cart => cart.product.tokenId ===product.tokenId) === -1) {
                setCartItem(prevState => [...prevState, { product, quantity: 1, price: latestPrice }])
                addToast('Carti!!!', { appearance: 'success' });
            } 
            else {
                setCartItem(prevState => {
                    const updatedCart = prevState.map(item => {
                        if (item.product.tokenId === product.tokenId) {
                            return {
                                ...item,
                                quantity: item.quantity + 1
                            };
                        }
                        return item;
                    });
                    return updatedCart as CartProps[];
                });
                addToast(`added another ${product.title} to Carti!!!`, { appearance: 'success' });
            }
          
        } catch (err) {
          console.log(err)
        }
    }


    return (
        <div>
            <div className={styles.productCard}>
                <div>
                    <img 
                        src={product.media[0].gateway} 
                        alt="" 
                        className={styles.productImg} 
                    />
                </div>
                <div className={styles.productDetails}>
                    <div className="productTitle">
                        <h2>{product.title}</h2>
                    </div>
                    <div>
                        <p>eth:{etherPrice!}</p>
                    </div>
                    <div className="productDesc">
                        <p>{product.description}</p>
                    </div>
                    <div className={styles.productAttr}>
                        {(product.rawMetadata.attributes).map((attributes: Attributes)=>(
                            <div key={attributes.trait_type}>
                                <span className={styles.productSpan} style={{textDecoration: attributes.value === "No" ? "line-through" : "Yes"}}>
                                    {attributes.trait_type}
                                </span>
                            </div>
                        ))}
                    </div>
                    <div className={styles.productButtons}>
                        <button className={styles.productBuy} disabled={!isConnected} onClick={handleBuy}> Buy </button>
                        <button className={styles.productCart} onClick={handleCartAdd}> Add to Cart </button> 
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductComponent;

/*
                setCartItem(prevState => {
                    return prevState.map((item) =>{
                        return item.product.tokenId === product.tokenId ? {...item.product, quantity: (item.quantity + 1) } : item
                    })
                })
                */