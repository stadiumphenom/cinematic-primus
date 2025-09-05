# Cinematic Primus

A modern, high-performance frontend application built with [Vite](https://vitejs.dev/) and [React](https://react.dev/). This project is designed for rapid development, modular scaling, and easy integration with contemporary JavaScript libraries and tools.

---

## 🚀 Features

- **Vite-powered development** for fast hot module reloading and optimized builds.
- **React SWC plugin** for ultra-fast TypeScript/JSX transformation.
- **Custom module aliases** for clean imports and version management.
- **Flexible build system**: ESNext targeting, customizable output directory.
- **Automatic CSS support** with PostCSS (Vite default).
- **Ready for extension** with popular component and utility libraries.

---

## 📦 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (18+ recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/stadiumphenom/cinematic-primus.git
cd cinematic-primus
npm install
```

### Development

Start the development server (hot reload, port 3000):

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
```

The output will be in the `/build` directory.

### Preview Production Build

```bash
npm run preview
```

---

## 🛠️ Project Structure

```
├── src/            # Application source code
│   ├── components/ # React components
│   ├── assets/     # Static assets (images, fonts, etc.)
│   └── ...         # Other modules
├── index.css       # Global styles
├── vite.config.ts  # Vite configuration
└── README.md       # This file
```

---

## 🎨 Module Aliases

Custom aliases are defined in `vite.config.ts` for cleaner imports and version pinning. Example usage:

```js
import Button from '@radix-ui/react-button'
```

Refer to the config file for all aliases.

---

## 🏗️ Extending & Contributing

1. Fork this repo.
2. Create a feature branch.
3. Make your changes, add tests if needed.
4. Submit a pull request!

Please follow best practices for code formatting and modularization.

---

## 🧪 Testing

> Add your testing framework (e.g. Jest, React Testing Library) and test instructions here.

---

## 📚 Documentation & Support

- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)

---

## 📄 License

MIT License © 2025 [stadiumphenom](https://github.com/stadiumphenom)
