import styles from '../styles/Cart.module.css'
import { useContractRead } from 'wagmi';
import { BigNumber, ethers } from 'ethers';
import { CartProps } from '../atom/cartState';




const CartComponent = ({ product, quantity, price } : CartProps) => {

    console.log(product, quantity, price)

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

    const getLatestPrice  = (contractReadFee.data!)
    const latestPrice = (getLatestPrice._hex)
    const etherPrice = ethers.utils.formatEther(latestPrice)

    return (
        <div className={styles.cartItem}>
            <span>
                <img src={product.media[0].gateway} className={styles.cartItemImg} alt="" />
            </span>
            <span className={styles.cartItemTitle}>{product.title}</span>
            <span className={styles.cartItemQuantity}>{quantity}</span>
            <span className={styles.cartItemTotal}>{quantity * Number(etherPrice)}</span>
        </div>
    );
}

export default CartComponent;