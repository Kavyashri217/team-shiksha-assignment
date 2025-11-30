import '../styles/globals.css';

export const metadata = {
  title: 'SaaS App',
  description: 'Minimal SaaS Application',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}