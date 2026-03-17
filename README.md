# 🏯 Lemongrass Fusion - Official Website

![Lemongrass Fusion Banner](https://img.shields.io/badge/Status-Production%20Ready-success) ![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?logo=vercel) ![AI Powered](https://img.shields.io/badge/AI-Powered%20by%20Groq-orange?logo=fastapi)

Bienvenido al repositorio oficial de la web de **Lemongrass Fusion**, un restaurante que combina la tradición asiática con la frescura mediterránea.

Esta web destaca por su **diseño premium (Glassmorphism)** y su integración con **Inteligencia Artificial** de última generación para ayudar a los clientes.

---

## ✨ Características Principales

### 🎨 Diseño & UX (Mobile Optimized)
- **Glassmorphism UI**: Paneles translúcidos de cristal esmerilado, fondos dinámicos y sombras suaves.
- **Animaciones Suaves**: Efecto de "burbujas" en la intro y transiciones fluidas entre secciones.
- **Carta Interactiva Premium**: 
    - Grid de productos con tarjetas limpias y elegantes.
    - **Filtros Adherentes (Sticky)**: Barra de categorías tipo "chips/píldoras" en móviles.
    - **Optimización Móvil**: Layout fluido sin desbordamientos y tipografía ajustada.
    - **Aviso de Alérgenos**: Banner informativo en la carta para máxima seguridad.
- **Totalmente Traducida**: Interfaz completa en **inglés** para un público internacional.

### 🤖 Smart ThaiChat Bot (AI Powered)
Un asistente virtual integrado que actúa como camarero experto y bilingüe.
- **Multilingüe**: Detecta el idioma del usuario (Español, Inglés, Francés, etc.) y responde en el mismo.
- **RAG (Retrieval Augmented Generation)**: El bot "lee" la carta del restaurante en tiempo real.
- **Experto en Alérgenos**: Responde dudas sobre gluten, lactosa, trazas, etc. con total precisión e incluye avisos de seguridad.
- **Intención de Reserva**: Detecta cuando el usuario quiere pedir o reservar y muestra botones interactivos de **WhatsApp** y **Llamada**.
- **Tecnología**: Groq Cloud API (Llama 3) + Vercel Serverless Functions.

---

## 🛠️ Tecnologías

- **Frontend**: HTML5, CSS3 (Variables, Flexbox/Grid), JavaScript (ES6+).
- **Backend**: Node.js (Vercel Serverless Functions / Local Server).
- **AI Engine**: Groq Cloud SDK (Llama 3.1 70B).
- **Deploy**: Vercel.

---

## 🚀 Instalación y Despliegue

### 1. Probar en Local (Ordenador)
Para que el chatbot funcione en tu PC, hemos incluido un servidor a medida:

```bash
# 1. Instalar dependencias
npm install

# 2. Configurar la API Key
# Crea un archivo .env y añade:
# GROQ_API_KEY=gsk_tu_clave_de_groq_aqui

# 3. Arrancar el servidor local
node server.js
```

Luego abre: **http://localhost:3000** en tu navegador.

### 2. Despliegue en Vercel
Para subir la web a producción:

1.  Importa este repositorio en [Vercel](https://vercel.com).
2.  En **Settings > Environment Variables**, añade:
    *   **Key**: `GROQ_API_KEY`
    *   **Value**: Tu clave de Groq Cloud.
3.  ¡Listo! El despliegue será automático.

---

## 📂 Estructura del Proyecto

```
/
├── api/                # Backend (Serverless Functions para Groq)
├── assets/
│   ├── css/            # Estilos (Glassmorphism, Responsive, Chat)
│   ├── js/             # Lógica (Frontend, Menu, Chatbot)
│   └── images/         # Fotos de platos y recursos gráficos
├── .env                # Configuración local (Git Ignore)
├── index.html          # Página de Inicio
├── menu.html           # Carta Digital Interactiva
├── server.js           # Servidor local para pruebas de Chatbot
├── package.json        # Dependencias de Node.js
└── README.md           # Documentación
```

---

## 📝 Créditos
Desarrollado con ❤️ para Lemongrass Fusion.
*Estilo Visual*: Glassmorphism / Dark Gourmet Theme / Fully Responsive.
