"use client";

import React from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { UserProvider } from "../context/UserContext";
import { CartProvider } from "../context/CartContext";
import { SessionProvider, useSession, signIn } from "next-auth/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

function AuthGuard({ children }: { children: React.ReactNode }) {
  const { status } = useSession();
  if (status === "loading") {
    return <div style={{ textAlign: "center", marginTop: 40 }}>Cargando...</div>;
  }
  if (status === "unauthenticated") {
    if (typeof window !== "undefined") signIn("google");
    return null;
  }
  return <>{children}</>;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Iconos decorativos de tecnología */}
        <img src="/tv.svg" className="tech-bg-icon tv" alt="tv" aria-hidden="true" />
        <img src="/laptop.svg" className="tech-bg-icon laptop" alt="laptop" aria-hidden="true" />
        <img src="/celular.svg" className="tech-bg-icon celular" alt="celular" aria-hidden="true" />
        <img src="/cart.svg" className="tech-bg-icon cart" alt="cart" aria-hidden="true" />
        <img src="/window.svg" className="tech-bg-icon window" alt="window" aria-hidden="true" />
        {/* Iconos decorativos de tecnología extra */}
        <img src="/monitor.svg" className="tech-bg-icon monitor" alt="monitor" aria-hidden="true" />
        <img src="/tablet.svg" className="tech-bg-icon tablet" alt="tablet" aria-hidden="true" />
        <img src="/smartwatch.svg" className="tech-bg-icon smartwatch" alt="smartwatch" aria-hidden="true" />
        <img src="/auriculares.svg" className="tech-bg-icon auriculares" alt="auriculares" aria-hidden="true" />
        <SessionProvider>
          <AuthGuard>
            <UserProvider>
              <CartProvider>{children}</CartProvider>
            </UserProvider>
          </AuthGuard>
        </SessionProvider>
      </body>
    </html>
  );
}
