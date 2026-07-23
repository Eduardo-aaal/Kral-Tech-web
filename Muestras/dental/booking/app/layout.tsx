import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Clínica Dental Care | Agenda tu Hora Online",
  description:
    "Reserva tu cita dental con los mejores especialistas. Odontología general, estética dental, ortodoncia e implantes.",
  keywords:
    "clínica dental, dentista, odontología, ortodoncia, implantes dentales, agenda online",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
