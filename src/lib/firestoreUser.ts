import { db } from './firebase';
import { collection, doc, setDoc, getDoc, getDocs, addDoc, query, orderBy } from 'firebase/firestore';

export interface UserData {
  nombre: string;
  correo: string;
  // otros campos relevantes
}

export interface Compra {
  id?: string;
  fecha: string;
  nombre: string;
  correo: string;
  carrito: Array<{ id: string; name: string; price: number; quantity: number; image: string }>;

}

export interface Comentario {
  id?: string;
  text: string;
  date: string;
}

export async function saveUserData(uid: string, data: UserData) {
  await setDoc(doc(db, 'users', uid), data, { merge: true });
}

export async function getUserData(uid: string): Promise<UserData | null> {
  const ref = doc(db, 'users', uid);
  const snap = await getDoc(ref);
  return snap.exists() ? (snap.data() as UserData) : null;
}

export async function addUserPurchase(uid: string, compra: Compra) {
  const ref = collection(db, 'users', uid, 'compras');
  await addDoc(ref, compra);
}

export async function getUserPurchases(uid: string): Promise<Compra[]> {
  const ref = collection(db, 'users', uid, 'compras');
  const q = query(ref, orderBy('fecha', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Compra));
}

export async function addUserComment(uid: string, comentario: Comentario) {
  const ref = collection(db, 'users', uid, 'comentarios');
  await addDoc(ref, comentario);
}

export async function getUserComments(uid: string): Promise<Comentario[]> {
  const ref = collection(db, 'users', uid, 'comentarios');
  const q = query(ref, orderBy('date', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Comentario));
}
