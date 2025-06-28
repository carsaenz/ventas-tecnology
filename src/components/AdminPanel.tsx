"use client";

import React, { useEffect, useState } from 'react';
import { collectionGroup, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';

interface Compra {
  id: string;
  fecha: string;
  nombre: string;
  correo: string;
  carrito?: Array<{ id: string; name: string; price: number; quantity: number; image: string }>;
  // ...otros campos relevantes...
}
interface Comentario {
  id: string;
  text: string;
  date: string;
}

const AdminPanel = () => {
  const [compras, setCompras] = useState<Compra[]>([]);
  const [comentarios, setComentarios] = useState<Comentario[]>([]);

  // Listener en tiempo real para todas las compras
  useEffect(() => {
    const q = query(collectionGroup(db, 'compras'), orderBy('fecha', 'desc'));
    const unsub = onSnapshot(q, snap => {
      setCompras(snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Compra)));
    });
    return () => unsub();
  }, []);

  // Listener en tiempo real para todos los comentarios
  useEffect(() => {
    const q = query(collectionGroup(db, 'comentarios'), orderBy('date', 'desc'));
    const unsub = onSnapshot(q, snap => {
      setComentarios(snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Comentario)));
    });
    return () => unsub();
  }, []);

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: 32 }}>
      <h1>Panel de Administración</h1>
      <section style={{ marginBottom: 40 }}>
        <h2>Compras recientes</h2>
        {compras.length === 0 ? <p>No hay compras registradas.</p> : (
          <ul style={{ padding: 0 }}>
            {compras.map((compra, idx) => (
              <li key={compra.id || idx} style={{ border: '1px solid #ccc', borderRadius: 8, margin: '12px 0', padding: 16, background: '#fafafa' }}>
                <div><b>Fecha:</b> {new Date(compra.fecha).toLocaleString()}</div>
                <div><b>Nombre:</b> {compra.nombre}</div>
                <div><b>Correo:</b> {compra.correo}</div>
                <div><b>Productos:</b>
                  <ul>
                    {compra.carrito?.map?.((item, i: number) => (
                      <li key={i}>{item.name} x{item.quantity} - ${item.price?.toLocaleString?.()}</li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
      <section>
        <h2>Comentarios y sugerencias</h2>
        {comentarios.length === 0 ? <p>No hay comentarios aún.</p> : (
          <ul style={{ padding: 0 }}>
            {comentarios.map((c, i) => (
              <li key={c.id || i} style={{ borderBottom: '1px solid #eee', padding: '10px 0' }}>
                <div style={{ fontSize: 13, color: '#555' }}>{new Date(c.date).toLocaleString()}</div>
                <div>{c.text}</div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default AdminPanel;
