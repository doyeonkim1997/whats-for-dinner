import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, (process as any).cwd(), '');

  return {
    plugins: [react()],
    define: {
      // Only expose API_KEY in development mode for local fallback.
      // In production, this will be undefined, ensuring security.
      'process.env.API_KEY': mode === 'development' ? JSON.stringify(env.API_KEY) : undefined,
    },
  };
});