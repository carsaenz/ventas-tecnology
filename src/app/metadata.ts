import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ecommerce Chatbot Inteligente",
  description: "Tienda online con catálogo, carrito, pagos, historial, comentarios y un chatbot inteligente que te asiste y sugiere productos. Login con Google y datos seguros en Firestore.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Ecommerce Chatbot Inteligente",
    description: "Tienda online con catálogo, carrito, pagos, historial, comentarios y un chatbot inteligente que te asiste y sugiere productos.",
    url: "https://tusitio.com/",
    siteName: "Ecommerce Chatbot",
    images: [
      {
        url: "/public/chatbot-icon.png",
        width: 512,
        height: 512,
        alt: "Chatbot Ecommerce Icon",
      },
    ],
    locale: "es_CO",
    type: "website",
  },
};
