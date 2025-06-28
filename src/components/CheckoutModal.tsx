import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useSession } from 'next-auth/react';
import { addUserPurchase } from '../lib/firestoreUser';

interface CheckoutModalProps {
  onClose: () => void;
}

const initialForm = {
  nombre: '',
  tipoDocumento: 'CC',
  numeroDocumento: '',
  telefono: '',
  correo: '',
  tipoCuenta: 'ahorros',
  tipoPersona: 'natural',
  numeroCuenta: '',
  banco: '', // nuevo campo
};

const CheckoutModal: React.FC<CheckoutModalProps> = ({ onClose }) => {
  const [form, setForm] = useState(initialForm);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { cart, clearCart } = useCart();
  const { data: session } = useSession();
  const uid = (session?.user as { id?: string })?.id;
  const user = session?.user;

  React.useEffect(() => {
    if (user) setForm(f => ({ ...f, nombre: user.name || '', correo: user.email || '' }));
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    console.log('Intentando guardar compra', { uid, form, cart });
    if (!uid) {
      setError('No se detectó usuario autenticado.');
      return;
    }
    try {
      await addUserPurchase(uid, { ...form, carrito: cart, fecha: new Date().toISOString() });
      setSuccess(true);
      clearCart();
      console.log('Compra guardada con éxito');
      // Ya no se cierra automáticamente
    } catch (err: any) {
      setError('Error al guardar la compra. Intenta de nuevo.');
      console.error('Error al guardar la compra:', err);
    }
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000 }}>
      <div style={{ background: '#fff', padding: 32, borderRadius: 12, minWidth: 340, maxWidth: 400, position: 'relative' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: 8, right: 8, fontSize: 18 }}>×</button>
        <h2>Pago</h2>
        {success ? (
          <div style={{ color: 'green', fontWeight: 600, fontSize: 20, textAlign: 'center', margin: '32px 0' }}>
            COMPRA EXITOSA<br />{user ? `¡Gracias por tu compra, ${user.name}!` : 'Gracias por usar nuestros servicios.'}
            <div style={{marginTop:16}}>
              <button onClick={onClose} style={{background:'#4caf50',color:'#fff',padding:'8px 20px',border:'none',borderRadius:6,fontWeight:600,fontSize:16,cursor:'pointer'}}>Cerrar</button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <input name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} required />
              <select name="tipoDocumento" value={form.tipoDocumento} onChange={handleChange} required>
                <option value="CC">Cédula</option>
                <option value="NIT">NIT</option>
                <option value="PASSPORT">Pasaporte</option>
              </select>
              <input name="numeroDocumento" placeholder="Número de documento" value={form.numeroDocumento} onChange={handleChange} required />
              <input name="telefono" placeholder="Número de teléfono" value={form.telefono} onChange={handleChange} required />
              <input name="correo" type="email" placeholder="Correo electrónico" value={form.correo} onChange={handleChange} required />
              <select name="tipoCuenta" value={form.tipoCuenta} onChange={handleChange} required>
                <option value="ahorros">Ahorros</option>
                <option value="corriente">Corriente</option>
                <option value="credito">Crédito</option>
              </select>
              <select name="tipoPersona" value={form.tipoPersona} onChange={handleChange} required>
                <option value="natural">Natural</option>
                <option value="juridica">Jurídica</option>
              </select>
              <input name="numeroCuenta" placeholder="Número de cuenta" value={form.numeroCuenta} onChange={handleChange} required />
              <select name="banco" value={form.banco || ''} onChange={handleChange} required>
                <option value="">Selecciona banco o billetera</option>
                <option value="Bancolombia">Bancolombia</option>
                <option value="Davivienda">Davivienda</option>
                <option value="Banco de Bogotá">Banco de Bogotá</option>
                <option value="Banco Popular">Banco Popular</option>
                <option value="Banco de Occidente">Banco de Occidente</option>
                <option value="BBVA">BBVA</option>
                <option value="Scotiabank Colpatria">Scotiabank Colpatria</option>
                <option value="Banco AV Villas">Banco AV Villas</option>
                <option value="Nequi">Nequi (billetera)</option>
                <option value="Daviplata">Daviplata (billetera)</option>
                <option value="Movii">Movii (billetera)</option>
                <option value="PSE">PSE (pagos en línea)</option>
                <option value="Otro">Otro</option>
              </select>
              <button type="submit" style={{ marginTop: 12 }}>Pagar</button>
              {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default CheckoutModal;
