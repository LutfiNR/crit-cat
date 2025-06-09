import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '@/theme';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import NextAuthProvider from '@/components/providers/NextAuthProvider';


export default function RootLayout(props) {
  return (
    <html lang="en">
      <body>
        <NextAuthProvider>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          {/* Header */}
          <header>
            <Navbar />
          </header>
          <main style={{minHeight:"100vh"}}>{props.children}</main>
          {/* Footer */}
          <footer>
            <Footer />
          </footer>
        </ThemeProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}