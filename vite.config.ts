import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'; 

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    allowedHosts: [
      'eleven-paws-lick.loca.lt' // 👈 add your ngrok host here
    ]
  }
});
