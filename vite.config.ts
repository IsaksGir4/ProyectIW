import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'; // Plugin esencial para React
import path from 'path'; // Para manejar rutas, útil para alias

// https://vitejs.dev/config/
export default defineConfig({
  // 1. Plugins: Aquí se listan los plugins que Vite usará
  plugins: [
    react(), // Habilita el soporte para React y JSX/TSX
  ],

  // 2. Servidor de desarrollo (opcional pero común)
  server: {
    port: 5173, // Puerto donde se ejecutará el servidor de desarrollo (por defecto 5173)
    open: true, // Abre automáticamente el navegador al iniciar el servidor
    // proxy: { // Configuración de proxy para llamadas a API (ej. para evitar problemas CORS)
    //   '/api': {
    //     target: 'http://localhost:8000', // URL de tu backend
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/api/, ''),
    //   },
    // },
  },

  // 3. Resolución de módulos (muy útil para alias de rutas)
  resolve: {
    alias: {
      // Configura alias para importaciones, por ejemplo, para usar rutas absolutas
      // como '@/components' en lugar de '../../components'
      '@': path.resolve(__dirname, './src'), // Apunta '@' a la carpeta 'src'
      // Opcional: si tienes otras carpetas importantes, como 'assets'
      // '@assets': path.resolve(__dirname, './src/assets'),
    },
  },

  // 4. Configuración de construcción (build)
  build: {
    outDir: 'dist', // Directorio de salida para la construcción (por defecto 'dist')
    // sourcemap: true, // Genera sourcemaps para depuración en producción
    // rollupOptions: { // Opciones avanzadas de Rollup (el bundler subyacente de Vite)
    //   output: {
    //     manualChunks(id) {
    //       if (id.includes('node_modules')) {
    //         // Agrupa las dependencias grandes en chunks separados
    //         return id.toString().split('node_modules/')[1].split('/')[0].toString();
    //       }
    //     }
    //   }
    // }
  },

  // 5. Configuración global de variables de entorno (opcional)
  // define: {
  //   'process.env.VITE_APP_VERSION': JSON.stringify(process.env.npm_package_version),
  // },
});