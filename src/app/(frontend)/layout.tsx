import React from 'react'
import './styles.css'

export const metadata = {
  description: 'Sistema de gestión de contenido del sitio web - Egida Juridica',
  title: 'Egida Juridica ',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="es">
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}
