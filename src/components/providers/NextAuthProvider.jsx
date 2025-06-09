// /src/providers/NextAuthProvider.jsx
"use client"; // Ini wajib, karena SessionProvider menggunakan React Context (client-side)

import { SessionProvider } from "next-auth/react";

export default function NextAuthProvider({ children }) {
  // Bungkus children dengan SessionProvider
  return <SessionProvider>{children}</SessionProvider>;
}