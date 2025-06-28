import React from 'react';
import { useCart } from '../context/CartContext';
import CheckoutModal from './CheckoutModal';
import Image from 'next/image';

const Cart = () => {
  const { cart, updateQuantity, removeFromCart } = useCart();
  const [showCheckout, setShowCheckout] = React.useState(false);
  const [showCart, setShowCart] = React.useState(false);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={() => setShowCart((v) => !v)}
        style={{ background: 'none', border: 'none', cursor: 'pointer', position: 'relative', padding: 0 }}
        aria-label="Ver carrito"
      >
        <Image src="/cart.svg" alt="Carrito" width={40} height={40} />
        {itemsCount > 0 && (
          <span style={{ position: 'absolute', top: 0, right: 0, background: 'red', color: '#fff', borderRadius: '50%', fontSize: 13, width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>{itemsCount}</span>
        )}
      </button>
      {showCart && (
        <div style={{ position: 'absolute', right: 0, top: 48, zIndex: 100, background: '#fff', border: '1px solid #ccc', borderRadius: 8, padding: 16, minWidth: 320, boxShadow: '0 2px 12px #0002' }}>
          <h3 style={{ marginTop: 0 }}>Carrito de Compras</h3>
          {cart.length === 0 ? (
            <div><b>Carrito vacío</b></div>
          ) : (
            <>
              {cart.map(item => (
                <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: 8, borderBottom: '1px solid #eee', padding: '8px 0' }}>
                  <Image src={item.image} alt={item.name} width={48} height={48} style={{ objectFit: 'cover', borderRadius: 4 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 500 }}>{item.name}</div>
                    <div style={{ fontSize: 13 }}>Precio: ${item.price.toLocaleString()}</div>
                    <div style={{ fontSize: 13 }}>Unidades:
                      <button onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))} style={{ margin: '0 4px' }}>-</button>
                      {item.quantity}
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} style={{ margin: '0 4px' }}>+</button>
                    </div>
                    <div style={{ fontSize: 13 }}>Precio final: <b>${(item.price * item.quantity).toLocaleString()}</b></div>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} style={{ color: 'red', fontWeight: 700, fontSize: 18, background: 'none', border: 'none' }}>×</button>
                </div>
              ))}
              <div style={{ textAlign: 'right', marginTop: 12 }}>
                <b>Total: ${total.toLocaleString()}</b>
              </div>
              <button style={{ marginTop: 12, width: '100%' }} onClick={() => setShowCheckout(true)}>
                Proceder al pago
              </button>
            </>
          )}
          {showCheckout && <CheckoutModal onClose={() => setShowCheckout(false)} />}
        </div>
      )}
    </div>
  );
};

export default Cart;
