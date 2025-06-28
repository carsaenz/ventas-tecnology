"use client";

import Image from "next/image";
import ProductList from "../components/ProductList";
import Cart from "../components/Cart";
import PurchaseHistory from "../components/PurchaseHistory";
import Chatbot from "../components/Chatbot";
import CommentsBox from "../components/CommentsBox";
import { signOut, useSession } from "next-auth/react";
import React, { useState } from "react";

export default function Home() {
  const { data: session, status } = useSession();
  const [showMenu, setShowMenu] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const handleOption = (option: string) => {
    setShowMenu(false);
    if (option === "historial") setShowHistory(true);
    if (option === "comentarios") setShowComments((v) => !v);
    if (option === "panel") window.location.href = "/admin";
    if (option === "salir") signOut();
  };

  return (
    <div className="min-h-screen p-8 flex flex-col gap-8 items-center bg-gray-50">
      {/* Icono de menú de opciones fijo arriba izquierda */}
      {status === "authenticated" && (
        <div style={{ position: "fixed", top: 24, left: 32, zIndex: 400 }}>
          <button
            onClick={() => setShowMenu((v) => !v)}
            style={{
              background: "rgba(56,189,248,0.18)", // más transparente
              border: "none",
              borderRadius: "50%",
              width: 48,
              height: 48,
              boxShadow: "0 2px 12px #38bdf822",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              position: "relative",
            }}
            aria-label="Opciones"
            title="Opciones"
            onMouseEnter={(e) => {
              const tooltip = document.createElement("div");
              tooltip.innerText = "Opciones";
              tooltip.style.position = "absolute";
              tooltip.style.top = "54px";
              tooltip.style.left = "50%";
              tooltip.style.transform = "translateX(-50%)";
              tooltip.style.background = "#2563eb";
              tooltip.style.color = "#fff";
              tooltip.style.padding = "4px 12px";
              tooltip.style.borderRadius = "6px";
              tooltip.style.fontSize = "13px";
              tooltip.style.fontWeight = "600";
              tooltip.style.zIndex = "9999";
              tooltip.className = "menu-tooltip";
              e.currentTarget.parentElement?.appendChild(tooltip);
            }}
            onMouseLeave={(e) => {
              const tooltip = e.currentTarget.parentElement?.querySelector(
                ".menu-tooltip"
              );
              if (tooltip) tooltip.remove();
            }}
          >
            <Image
              src="/menu.svg"
              alt="Opciones"
              width={28}
              height={28}
              style={{ opacity: 0.6 }}
            />
          </button>
          {showMenu && (
            <div
              style={{
                position: "absolute",
                top: 56,
                left: 0,
                background: "#fff",
                borderRadius: 10,
                boxShadow: "0 4px 24px #0002",
                minWidth: 180,
                padding: 8,
                zIndex: 401,
              }}
            >
              <button
                onClick={() => handleOption("historial")}
                style={{
                  display: "block",
                  width: "100%",
                  background: "none",
                  border: "none",
                  textAlign: "left",
                  padding: 10,
                  fontWeight: 500,
                  color: "#2563eb",
                  borderRadius: 6,
                  cursor: "pointer",
                }}
              >
                Historial
              </button>
              <button
                onClick={() => handleOption("comentarios")}
                style={{
                  display: "block",
                  width: "100%",
                  background: "none",
                  border: "none",
                  textAlign: "left",
                  padding: 10,
                  fontWeight: 500,
                  color: "#2563eb",
                  borderRadius: 6,
                  cursor: "pointer",
                }}
              >
                Comentarios
              </button>
              <button
                onClick={() => handleOption("panel")}
                style={{
                  display: "block",
                  width: "100%",
                  background: "none",
                  border: "none",
                  textAlign: "left",
                  padding: 10,
                  fontWeight: 500,
                  color: "#9333ea",
                  borderRadius: 6,
                  cursor: "pointer",
                }}
              >
                Panel Admin
              </button>
              <button
                onClick={() => handleOption("salir")}
                style={{
                  display: "block",
                  width: "100%",
                  background: "none",
                  border: "none",
                  textAlign: "left",
                  padding: 10,
                  fontWeight: 500,
                  color: "#ef4444",
                  borderRadius: 6,
                  cursor: "pointer",
                }}
              >
                Salir
              </button>
            </div>
          )}
        </div>
      )}
      {/* Nombre del usuario arriba a la derecha, más pequeño */}
      {status === "authenticated" && session?.user?.name && (
        <div
          style={{
            position: "fixed",
            top: 18,
            right: 32,
            zIndex: 350,
            textAlign: "right",
            fontWeight: 600,
            fontSize: 15,
            color: "#2563eb",
            textShadow: "0 1px 4px #fff, 0 1px 0 #38bdf8",
          }}
        >
          {session.user.name}
        </div>
      )}
      {/* Nombre de la empresa grande y azul brillante arriba */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 500,
          textAlign: "center",
          fontWeight: 900,
          fontSize: 28,
          color: "#00b3ff",
          letterSpacing: 2,
          fontFamily: "'Orbitron', 'Segoe UI', 'Arial', sans-serif",
          textShadow:
            "0 2px 16px #38bdf8, 0 1px 0 #fff, 0 0 32px #00eaff99",
        }}
      >
        TECNOLIGY HOLDING SZ
      </div>
      {/* Modal de historial de compras */}
      {showHistory && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.35)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 2000,
          }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: 12,
              minWidth: 320,
              maxWidth: 500,
              padding: 32,
              position: "relative",
              boxShadow: "0 8px 32px #0002",
              maxHeight: "80vh",
              overflowY: "auto",
            }}
          >
            <button
              onClick={() => setShowHistory(false)}
              style={{
                position: "absolute",
                top: 10,
                right: 16,
                fontSize: 22,
                background: "none",
                border: "none",
                color: "#888",
                cursor: "pointer",
              }}
            >
              ×
            </button>
            <PurchaseHistory />
          </div>
        </div>
      )}
      {/* Comentarios (modal o panel lateral) */}
      {showComments && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.35)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 2000,
          }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: 12,
              minWidth: 320,
              maxWidth: 500,
              padding: 32,
              position: "relative",
              boxShadow: "0 8px 32px #0002",
              maxHeight: "80vh",
              overflowY: "auto",
            }}
          >
            <button
              onClick={() => setShowComments(false)}
              style={{
                position: "absolute",
                top: 10,
                right: 16,
                fontSize: 22,
                background: "none",
                border: "none",
                color: "#888",
                cursor: "pointer",
              }}
            >
              ×
            </button>
            <CommentsBox />
          </div>
        </div>
      )}
      {/* Carrito en la parte superior derecha */}
      <div style={{ position: "fixed", top: 54, right: 20, zIndex: 100 }}>
        <Cart />
      </div>
      {/* Catálogo de productos */}
      <div style={{ maxWidth: 1200, width: "100%", marginTop: 110 }}>
        <ProductList />
      </div>
      {/* Historial de compras y comentarios en dos columnas en desktop */}
      <div className="w-full flex flex-col md:flex-row gap-8 justify-center">
        {/* Historial ahora solo muestra el botón, el modal se maneja dentro del componente */}
        <div style={{ flex: 1, maxWidth: 600 }}>
          <PurchaseHistory />
        </div>
        <div
          style={{
            flex: 1,
            maxWidth: 500,
            display: showComments ? "block" : "none",
          }}
        >
          <CommentsBox />
        </div>
      </div>
      {/* Chatbot (flotante en la esquina) */}
      <div style={{ position: "fixed", bottom: 20, right: 20, zIndex: 200 }}>
        <Chatbot />
      </div>
    </div>
  );
}
