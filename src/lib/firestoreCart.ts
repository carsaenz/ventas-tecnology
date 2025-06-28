import { db } from './firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { CartItem } from '../context/CartContext';

export async function getUserCart(uid: string): Promise<CartItem[]> {
  const ref = doc(db, 'users', uid, 'cart', 'cart');
  const snap = await getDoc(ref);
  return snap.exists() ? (snap.data().items as CartItem[]) : [];
}

export async function saveUserCart(uid: string, cart: CartItem[]) {
  const ref = doc(db, 'users', uid, 'cart', 'cart');
  await setDoc(ref, { items: cart });
}
