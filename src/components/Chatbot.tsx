import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';
import { digitalProducts } from './digitalProducts';
import Image from 'next/image';

const LANGS = [
  { code: 'es', label: 'Español' },
  { code: 'en', label: 'English' }
];

interface User {
  name?: string;
  // ...otros campos si es necesario
}

const respuestas = [
  { trigger: /hola|buenas|saludos/i, respuesta: (user: User | null, lang: string) => lang === 'en' ? `Hello${user ? ', ' + user.name : ''}! How can I help you today?` : `¡Hola${user ? ', ' + user.name : ''}! ¿En qué puedo ayudarte hoy?` },
  { trigger: /producto|oferta|product|deal/i, respuesta: (user: User | null, lang: string) => lang === 'en' ? 'Are you looking for a specific product? I can suggest options.' : '¿Buscas algún producto en particular? Puedo sugerirte opciones.' },
  { trigger: /carrito|cart|agregar|add/i, respuesta: (user: User | null, lang: string) => lang === 'en' ? 'You can add products to the cart from the catalog. Need help choosing?' : 'Puedes agregar productos al carrito desde el catálogo. ¿Te ayudo a elegir alguno?' },
  { trigger: /comprar|pagar|buy|pay/i, respuesta: (user: User | null, lang: string) => lang === 'en' ? 'When ready, click the cart and then "Checkout". Need help with the form?' : 'Cuando estés listo, haz clic en el carrito y luego en "Proceder al pago". ¿Necesitas ayuda con el formulario?' },
  { trigger: /historial|compras|history|purchase/i, respuesta: (user: User | null, lang: string) => lang === 'en' ? 'You can see your purchase history in the corresponding section.' : 'Puedes ver tu historial de compras en la sección correspondiente.' },
  { trigger: /comentario|sugerencia|comment|suggestion/i, respuesta: (user: User | null, lang: string) => lang === 'en' ? 'You can leave your comments and suggestions in the special box.' : 'Puedes dejar tus comentarios y sugerencias en la caja especial.' },
  { trigger: /gracias|thank/i, respuesta: (user: User | null, lang: string) => lang === 'en' ? `You’re welcome${user ? ', ' + user.name : ''}!` : `¡Con gusto${user ? ', ' + user.name : ''}!` },
];

const sugerencias = [
  '¿Te gustaría ver nuestras mejores ofertas de productos?',
  '¿Buscas laptops, celulares o TVs de alguna marca?',
  '¿Quieres ayuda para completar tu compra o dejar una sugerencia?',
  '¿Te muestro tu historial de compras o te ayudo a elegir un producto?'
];

const categorias = [
  { key: 'laptop', es: 'Laptops', en: 'Laptops' },
  { key: 'celular', es: 'Celulares', en: 'Phones' },
  { key: 'tv', es: 'Televisores', en: 'TVs' }
];

// Normaliza la entrada corrigiendo errores comunes y variantes
function normalizeInput(input: string) {
  return input
    .toLowerCase()
    .replace(/\bholaa?\b/g, 'hola')
    .replace(/\bgrasias\b/g, 'gracias')
    .replace(/\bporfa\b/g, 'por favor')
    .replace(/\bcompras?\b/g, 'comprar')
    .replace(/\bcarito\b/g, 'carrito')
    .replace(/\bcel\b/g, 'celular')
    .replace(/\bcelu\b/g, 'celular')
    .replace(/\btele\b/g, 'tv')
    .replace(/\btelevisor\b/g, 'tv')
    .replace(/\bprodcuto\b/g, 'producto')
    .replace(/\bcomentar\b/g, 'comentario')
    .replace(/\bsujerencia\b/g, 'sugerencia')
    .replace(/\bistorial\b/g, 'historial')
    .replace(/\bpagarr?\b/g, 'pagar')
    .replace(/\bagg?regar\b/g, 'agregar')
    .replace(/\baddd?\b/g, 'add')
    .replace(/\bquikc?\b/g, 'quick')
    .replace(/\bproducct\b/g, 'producto')
    .replace(/\bcoment\b/g, 'comentario')
    .replace(/\bsugeren\b/g, 'sugerencia')
    .replace(/\bgracis\b/g, 'gracias')
    .replace(/\bthx\b/g, 'gracias')
    .replace(/\bplis\b/g, 'por favor')
    .replace(/\bpleas?e?\b/g, 'please')
    .replace(/\bhelo\b/g, 'hello')
    .replace(/\bhi+\b/g, 'hi')
    .replace(/\bhelo+\b/g, 'hello')
    .replace(/\bthnk\b/g, 'thank')
    .replace(/\bthnks\b/g, 'thanks')
    .replace(/\bcomentari\b/g, 'comentario')
    .replace(/\bcomprass?\b/g, 'compras')
    .replace(/\bcarritto\b/g, 'carrito')
    .replace(/\bproducots?\b/g, 'producto')
    .replace(/\bproducctos?\b/g, 'producto')
    .replace(/\bcelulares?\b/g, 'celular')
    .replace(/\btelefonos?\b/g, 'celular')
    .replace(/\btelevisores?\b/g, 'tv')
    .replace(/\btelevison\b/g, 'tv')
    .replace(/\btelevisio?n\b/g, 'tv')
    .replace(/\btelevisio?n\b/g, 'tv')
    .replace(/\bagg?regr?ar\b/g, 'agregar')
    .replace(/\bagg?regr?o\b/g, 'agrego')
    .replace(/\bagg?regr?e\b/g, 'agregue')
    .replace(/\bagg?regr?as\b/g, 'agregas')
    .replace(/\bagg?regr?amos\b/g, 'agregamos')
    .replace(/\bagg?regr?an\b/g, 'agregan')
    .replace(/\bagg?regr?ando\b/g, 'agregando')
    .replace(/\bagg?regr?ado\b/g, 'agregado')
    .replace(/\bagg?regr?ada\b/g, 'agregada')
    .replace(/\bagg?regr?adas\b/g, 'agregadas')
    .replace(/\bagg?regr?ados\b/g, 'agregados')
    .replace(/\bagg?regr?ar\b/g, 'agregar')
    .replace(/\bagg?regr?e\b/g, 'agregue')
    .replace(/\bagg?regr?o\b/g, 'agrego')
    .replace(/\bagg?regr?as\b/g, 'agregas')
    .replace(/\bagg?regr?amos\b/g, 'agregamos')
    .replace(/\bagg?regr?an\b/g, 'agregan')
    .replace(/\bagg?regr?ando\b/g, 'agregando')
    .replace(/\bagg?regr?ado\b/g, 'agregado')
    .replace(/\bagg?regr?ada\b/g, 'agregada')
    .replace(/\bagg?regr?adas\b/g, 'agregadas')
    .replace(/\bagg?regr?ados\b/g, 'agregados')
    .replace(/\bbarato?s?\b/g, 'economico')
    .replace(/\bbarata?s?\b/g, 'economico')
    .replace(/\beconomica?s?\b/g, 'economico')
    .replace(/\beconomico?s?\b/g, 'economico')
    .replace(/\blow cost\b/g, 'economico')
    .replace(/\bcheap\b/g, 'economico')
    .replace(/\btelefono?s?\b/g, 'celular')
    .replace(/\bmovil(es)?\b/g, 'celular')
    .replace(/\s+/g, ' ')
    .trim();
}

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [chat, setChat] = useState([
    { from: 'bot', text: '¡Hola! Soy tu asistente virtual. ¿En qué puedo ayudarte?' },
    { from: 'bot', text: sugerencias[Math.floor(Math.random() * sugerencias.length)] },
  ]);
  const [language, setLanguage] = useState('es');
  const [showSugerencias, setShowSugerencias] = useState(false);
  const { cart } = useCart();
  const { user } = useUser();

  // Acciones rápidas mejoradas
  const quickActions = [
    { label: language === 'es' ? 'Ver carrito' : 'View cart', action: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
    { label: language === 'es' ? 'Ver historial' : 'View history', action: () => window.location.hash = '#historial' },
    { label: language === 'es' ? 'Ver comentarios' : 'View comments', action: () => window.location.hash = '#comentarios' },
    { label: language === 'es' ? 'Sugerencias' : 'Suggestions', action: () => setShowSugerencias(true) },
  ];

  // Sugerencias de productos por categoría
  const sugerenciasPorCategoria = (cat: string) => {
    const productos = digitalProducts.filter(p => p.name.toLowerCase().includes(cat));
    return productos.slice(0, 3).map(p => `• ${p.name} - $${p.price.toLocaleString()}`).join('\n');
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = { from: 'user', text: input };
    const normalized = normalizeInput(input);
    let respuesta: string | undefined = undefined;
    // --- Nueva lógica para celulares económicos ---
    if (/informacion|info|quiero|busco|tienes|mostrar|ver|necesito|dame|oferta/.test(normalized) && /celular/.test(normalized) && /economico/.test(normalized)) {
      // Buscar los 3 celulares más baratos
      const baratos = digitalProducts
        .filter(p => p.name.toLowerCase().includes('celular') || p.name.toLowerCase().includes('galaxy') || p.name.toLowerCase().includes('iphone') || p.name.toLowerCase().includes('redmi') || p.name.toLowerCase().includes('motorola'))
        .sort((a, b) => a.price - b.price)
        .slice(0, 3);
      if (baratos.length > 0) {
        respuesta = language === 'en'
          ? `Here are some affordable phones:\n${baratos.map(p => `• ${p.name} - $${p.price.toLocaleString()}`).join('\n')}`
          : `Estos son algunos celulares económicos:\n${baratos.map(p => `• ${p.name} - $${p.price.toLocaleString()}`).join('\n')}`;
      } else {
        respuesta = language === 'en' ? 'No cheap phones found.' : 'No se encontraron celulares económicos.';
      }
    }
    if (!respuesta) {
      for (const r of respuestas) {
        if (r.trigger.test(normalized)) {
          respuesta = typeof r.respuesta === 'function' ? r.respuesta(user, language) : r.respuesta;
          break;
        }
      }
    }
    // Sugerir productos si el usuario pregunta por sugerencias
    if (/sugerencia|recomienda|sugiere|suggest/i.test(normalized)) {
      respuesta = language === 'en'
        ? 'I recommend checking the featured products in the main catalog. Would you like a personalized suggestion?'
        : 'Te recomiendo revisar los productos destacados en el catálogo principal. ¿Te gustaría una sugerencia personalizada?';
      setShowSugerencias(true);
    }
    // Si pregunta por el carrito
    if (/carrito|cart|cuánto|total/i.test(normalized)) {
      const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
      respuesta = language === 'en'
        ? `You have ${cart.length} product(s) in your cart. Total: $${total.toLocaleString()}`
        : `Actualmente tienes ${cart.length} producto(s) en tu carrito. Total: $${total.toLocaleString()}`;
    }
    // Si pregunta por historial
    if (/historial|compras|history|purchase/i.test(normalized)) {
      respuesta = language === 'en'
        ? 'You can see your purchase history in the corresponding section.'
        : 'Puedes ver tu historial de compras en la sección correspondiente.';
    }
    // Si pregunta por comentarios
    if (/comentario|sugerencia|comment|suggestion/i.test(normalized)) {
      respuesta = language === 'en'
        ? 'You can leave your comments and suggestions in the special box.'
        : 'Puedes dejar tus comentarios y sugerencias en la caja especial.';
    }
    if (!respuesta) respuesta = language === 'en'
      ? 'Sorry, I did not understand your message. Can you rephrase or be more specific?'
      : 'No entendí tu mensaje. ¿Puedes reformularlo o ser más específico?';
    setChat([...chat, userMsg, { from: 'bot', text: respuesta }]);
    setInput('');
  };

  return (
    <div style={{ width: open ? 360 : 60, transition: 'width 0.3s', background: '#fff', borderRadius: 16, boxShadow: '0 2px 12px #0002', overflow: 'hidden' }}>
      {open ? (
        <div style={{ display: 'flex', flexDirection: 'column', height: 440 }}>
          <div style={{ background: '#4f46e5', color: '#fff', padding: 12, fontWeight: 600, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            Chatbot
            <select value={language} onChange={e => setLanguage(e.target.value)} style={{ marginLeft: 12, borderRadius: 6, border: 'none', padding: '2px 8px', fontWeight: 500 }}>
              {LANGS.map(l => <option key={l.code} value={l.code}>{l.label}</option>)}
            </select>
            <button onClick={() => setOpen(false)} style={{ background: 'none', border: 'none', color: '#fff', fontSize: 18, marginLeft: 8 }}>×</button>
          </div>
          <div style={{ flex: 1, padding: 12, overflowY: 'auto', fontSize: 15 }}>
            {chat.map((msg, i) => (
              <div key={i} style={{ textAlign: msg.from === 'bot' ? 'left' : 'right', margin: '8px 0' }}>
                <span style={{ background: msg.from === 'bot' ? '#e0e7ff' : '#d1fae5', padding: '6px 12px', borderRadius: 12, display: 'inline-block', whiteSpace: 'pre-line' }}>{msg.text}</span>
              </div>
            ))}
            {showSugerencias && (
              <div style={{ marginTop: 16, background: '#f0f9ff', borderRadius: 8, padding: 12 }}>
                <b>{language === 'es' ? 'Sugerencias por categoría:' : 'Suggestions by category:'}</b>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 8 }}>
                  {categorias.map(cat => (
                    <button key={cat.key} onClick={() => setChat([...chat, { from: 'bot', text: sugerenciasPorCategoria(cat.key) }])} style={{ background: '#38bdf8', color: '#fff', border: 'none', borderRadius: 8, padding: '4px 12px', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>{cat[language as 'es' | 'en']}</button>
                  ))}
                  <button onClick={() => setShowSugerencias(false)} style={{ background: '#ef4444', color: '#fff', border: 'none', borderRadius: 8, padding: '4px 12px', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>{language === 'es' ? 'Cerrar' : 'Close'}</button>
                </div>
              </div>
            )}
          </div>
          <div style={{ padding: 8, borderTop: '1px solid #eee', display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ display: 'flex', gap: 8 }}>
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                placeholder={language === 'es' ? 'Escribe tu mensaje...' : 'Type your message...'}
                style={{ flex: 1, borderRadius: 8, border: '1px solid #ccc', padding: 8 }}
              />
              <button onClick={handleSend} style={{ background: '#4f46e5', color: '#fff', border: 'none', borderRadius: 8, padding: '0 16px' }}>{language === 'es' ? 'Enviar' : 'Send'}</button>
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {quickActions.map((a, i) => (
                <button key={i} onClick={a.action} style={{ background: '#38bdf8', color: '#fff', border: 'none', borderRadius: 8, padding: '4px 12px', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>{a.label}</button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <button onClick={() => setOpen(true)} style={{ width: 60, height: 60, borderRadius: '50%', background: '#4f46e5', color: '#fff', fontSize: 28, border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 12px #4f46e522' }}>
          <Image src="/robot.svg" alt="Abrir chatbot" width={36} height={36} />
        </button>
      )}
    </div>
  );
};

export default Chatbot;
