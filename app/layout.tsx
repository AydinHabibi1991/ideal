import ClientWrapper from '@/components/ClientWrapper';
import { Inter } from 'next/font/google';
import '../styles/globals.css'; 


const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Todo App',
  description: 'A simple todo app built with Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientWrapper>{children}</ClientWrapper>
      </body>
    </html>
  );
}
