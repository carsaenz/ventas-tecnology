import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { getUserPurchases } from '../lib/firestoreUser';

interface Compra {
  id: string;
  fecha: string;
  nombre: string;
  correo: string;
  carrito: Array<{ id: string; name: string; price: number; quantity: number; image: string }>;
  // ...otros campos relevantes...
}

const PurchaseHistory = () => {
  const { data: session } = useSession();
  const uid = (session?.user as { id?: string })?.id;
  const [historial, setHistorial] = useState<Compra[]>([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (uid) {
      getUserPurchases(uid).then((data) => setHistorial(data.map((doc: any) => ({ id: doc.id, ...doc }))));
    } else {
      setHistorial([]);
    }
  }, [uid]);

  if (historial.length === 0) {
    return (
      <>
        <button onClick={() => setShowModal(true)} style={{ background: '#38bdf8', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 18px', fontWeight: 600, marginBottom: 12 }}>Ver historial de compras</button>
        {showModal && (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000 }}>
            <div style={{ background: '#fff', borderRadius: 12, minWidth: 320, maxWidth: 500, padding: 32, position: 'relative', boxShadow: '0 8px 32px #0002' }}>
              <button onClick={() => setShowModal(false)} style={{ position: 'absolute', top: 10, right: 16, fontSize: 22, background: 'none', border: 'none', color: '#888', cursor: 'pointer' }}>×</button>
              <h2>Historial de Compras</h2>
              <p>No hay compras registradas.</p>
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <>
      <button onClick={() => setShowModal(true)} style={{ background: '#38bdf8', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 18px', fontWeight: 600, marginBottom: 12 }}>Ver historial de compras</button>
      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000 }}>
          <div style={{ background: '#fff', borderRadius: 12, minWidth: 320, maxWidth: 500, padding: 32, position: 'relative', boxShadow: '0 8px 32px #0002', maxHeight: '80vh', overflowY: 'auto' }}>
            <button onClick={() => setShowModal(false)} style={{ position: 'absolute', top: 10, right: 16, fontSize: 22, background: 'none', border: 'none', color: '#888', cursor: 'pointer' }}>×</button>
            <h2>Historial de Compras</h2>
            <ul style={{ padding: 0 }}>
              {historial.map((compra, idx) => (
                <li key={idx} style={{ border: '1px solid #ccc', borderRadius: 8, margin: '12px 0', padding: 16, background: '#fafafa' }}>
                  <div><b>Fecha:</b> {new Date(compra.fecha).toLocaleString()}</div>
                  <div><b>Nombre:</b> {compra.nombre}</div>
                  <div><b>Correo:</b> {compra.correo}</div>
                  <div><b>Productos:</b>
                    <ul>
                      {compra.carrito.map((item, i: number) => (
                        <li key={i}>{item.name} x{item.quantity} - ${item.price.toLocaleString()}</li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default PurchaseHistory;
