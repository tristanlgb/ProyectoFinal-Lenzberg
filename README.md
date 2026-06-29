# Proyecto final React — E-commerce

Aplicación de catálogo y carrito desarrollada como proyecto final de React. Los productos se obtienen desde Firebase y pueden explorarse por categoría o desde su página de detalle.

## Demo

[Ver aplicación desplegada en Vercel](https://proyecto-final-lenzberg.vercel.app/)

## Funcionalidades

- Catálogo de productos.
- Filtrado por categoría.
- Vista de detalle por producto.
- Agregado de productos al carrito.
- Indicador de cantidad en la navegación.
- Persistencia de catálogo mediante Firebase.
- Rutas dinámicas y página no encontrada.

## Stack

- React
- Vite
- React Router DOM
- Firebase
- React Bootstrap y Bootstrap
- React Icons
- ESLint
- Vercel

## Organización

`src/App.jsx` define el estado del carrito y las rutas. Los componentes de catálogo, detalle, navegación y carrito se encuentran en `src/components/`. `src/firebaseConfig.jsx` configura la conexión con Firebase.

## Ejecución local

```bash
npm install
npm run dev
```

Para utilizar una instancia propia, reemplazar la configuración de Firebase y preparar la colección de productos requerida.

## Comandos

```bash
npm run build
npm run lint
npm run preview
```

> Proyecto educativo realizado para el curso de React de Coderhouse.