import {atom} from 'recoil'
import { Product } from '../models/models'

export interface CartProps {
    product : Product,
    quantity: number,
    price: string,
}

export const cartState = atom<CartProps[]>({
    key: 'cartState',
    default:[]
})