import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { addUserComment, getUserComments } from '../lib/firestoreUser';

interface Comentario {
  id: string;
  text: string;
  date: string;
}

const CommentsBox = () => {
  const { data: session } = useSession();
  const uid = (session?.user as { id?: string })?.id;
  const [comments, setComments] = useState<Comentario[]>([]);
  const [input, setInput] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (uid) {
      getUserComments(uid).then(data => {
        setComments(data as Comentario[]);
      });
    } else {
      setComments([]);
    }
  }, [uid]);

  const handleSend = async () => {
    if (!input.trim() || !uid) return;
    const nuevo: Comentario = { id: Date.now().toString(), text: input, date: new Date().toISOString() };
    await addUserComment(uid, nuevo);
    setComments([nuevo, ...comments]);
    setInput('');
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2000);
  };

  return (
    <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px #0001', padding: 24, maxWidth: 500, width: '100%' }}>
      <h2 className="text-lg font-bold mb-2">Comentarios y Sugerencias</h2>
      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Escribe tu comentario o sugerencia..."
        rows={3}
        className="w-full border rounded p-2 mb-2"
      />
      <button onClick={handleSend} className="bg-blue-600 text-white px-4 py-2 rounded" style={{marginBottom:8}}>Enviar</button>
      {success && <div style={{ color: 'green', marginBottom: 8 }}>¡Gracias por tu comentario!</div>}
      <div style={{ maxHeight: 180, overflowY: 'auto', marginTop: 8 }}>
        {comments.length === 0 ? <div>No hay comentarios aún.</div> : comments.map((c, i) => (
          <div key={i} style={{ borderBottom: '1px solid #eee', padding: '6px 0' }}>
            <div style={{ fontSize: 13, color: '#555' }}>{new Date(c.date).toLocaleString()}</div>
            <div>{c.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentsBox;
