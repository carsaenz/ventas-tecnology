import React from 'react';
import { useCart, Product } from '../context/CartContext';
import { digitalProducts } from './digitalProducts';
import Image from 'next/image';

const products: Product[] = digitalProducts;

const uniqueBrands = Array.from(new Set(products.map(p => p.brand)));
const minPrice = Math.min(...products.map(p => p.price));
const maxPrice = Math.max(...products.map(p => p.price));

const ProductList = () => {
  const { addToCart } = useCart();
  const [selected, setSelected] = React.useState<Product | null>(null);
  const [quantity, setQuantity] = React.useState(1);
  const [brand, setBrand] = React.useState('');
  const [priceRange, setPriceRange] = React.useState<[number, number]>([minPrice, maxPrice]);

  const filtered = products.filter(p =>
    (brand === '' || p.brand === brand) &&
    p.price >= priceRange[0] && p.price <= priceRange[1]
  );

  return (
    <div>
      <h2>Catálogo de Productos</h2>
      <div style={{ display: 'flex', gap: 24, marginBottom: 24 }}>
        <div>
          <label>Marca:&nbsp;</label>
          <select value={brand} onChange={e => setBrand(e.target.value)}>
            <option value="">Todas</option>
            {uniqueBrands.map(b => <option key={b} value={b}>{b}</option>)}
          </select>
        </div>
        <div>
          <label>Precio:&nbsp;</label>
          <input type="number" min={minPrice} max={maxPrice} value={priceRange[0]} onChange={e => setPriceRange([Number(e.target.value), priceRange[1]])} style={{ width: 90 }} />
          &nbsp;-&nbsp;
          <input type="number" min={minPrice} max={maxPrice} value={priceRange[1]} onChange={e => setPriceRange([priceRange[0], Number(e.target.value)])} style={{ width: 90 }} />
        </div>
      </div>
      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
        {filtered.length === 0 ? <div>No hay productos para este filtro.</div> : filtered.map(product => (
          <div key={product.id} style={{
            border: '1px solid #ccc',
            borderRadius: 8,
            padding: 16,
            width: 260,
            background: 'rgba(56,189,248,0.18)', // azul claro, aún más transparente
            boxShadow: '0 4px 24px 0 rgba(56,189,248,0.06)',
            backdropFilter: 'blur(2px)'
          }}>
            <Image src={product.image} alt={product.name} width={260} height={120} style={{ width: '100%', height: 120, objectFit: 'cover', borderRadius: 4 }} />
            <h3>{product.name}</h3>
            <p><b>Precio:</b> ${product.price.toLocaleString()}</p>
            <p style={{ color: 'black' }}>{product.description}</p>
            <button onClick={() => setSelected(product)} style={{ marginRight: 8, color: 'blue', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}>Ver detalles</button>
            <button onClick={() => addToCart(product, 1)} style={{ color: 'blue', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}>Agregar al carrito</button>
          </div>
        ))}
      </div>
      {/* Modal de detalles */}
      {selected && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: '#fff', padding: 32, borderRadius: 12, minWidth: 320, maxWidth: 400, position: 'relative' }}>
            <button onClick={() => setSelected(null)} style={{ position: 'absolute', top: 8, right: 8, fontSize: 18 }}>×</button>
            <Image src={selected.image} alt={selected.name} width={400} height={160} style={{ width: '100%', height: 160, objectFit: 'cover', borderRadius: 4 }} />
            <h2>{selected.name}</h2>
            <p style={{ color: 'black' }}>{selected.description}</p>
            <p><b>Marca:</b> {selected.brand}</p>
            <p><b>Precio:</b> ${selected.price.toLocaleString()}</p>
            <p><b>Disponibles:</b> {selected.stock}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, margin: '12px 0' }}>
              <label>Cantidad:</label>
              <input type="number" min={1} max={selected.stock} value={quantity} onChange={e => setQuantity(Number(e.target.value))} style={{ width: 60 }} />
            </div>
            <button onClick={() => { addToCart(selected, quantity); setSelected(null); setQuantity(1); }} style={{ color: 'blue', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}>
              Agregar {quantity} al carrito
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
