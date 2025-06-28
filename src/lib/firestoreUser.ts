import { db } from './firebase';
import { collection, doc, setDoc, getDoc, getDocs, addDoc, query, orderBy } from 'firebase/firestore';

export async function saveUserData(uid: string, data: any) {
  await setDoc(doc(db, 'users', uid), data, { merge: true });
}

export async function getUserData(uid: string) {
  const ref = doc(db, 'users', uid);
  const snap = await getDoc(ref);
  return snap.exists() ? snap.data() : null;
}

export async function addUserPurchase(uid: string, compra: any) {
  const ref = collection(db, 'users', uid, 'compras');
  await addDoc(ref, compra);
}

export async function getUserPurchases(uid: string) {
  const ref = collection(db, 'users', uid, 'compras');
  const q = query(ref, orderBy('fecha', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function addUserComment(uid: string, comentario: any) {
  const ref = collection(db, 'users', uid, 'comentarios');
  await addDoc(ref, comentario);
}

export async function getUserComments(uid: string) {
  const ref = collection(db, 'users', uid, 'comentarios');
  const q = query(ref, orderBy('date', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}
