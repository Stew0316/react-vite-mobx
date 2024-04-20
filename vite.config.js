import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path';

function pathResolve(dir) {
  return resolve(__dirname, '.', dir);
}
// https://vitejs.dev/config/
export default ({mode}) => {
  const env = loadEnv(mode, process.cwd())
  return defineConfig({
    base: env.VITE_BASE_NAME,
    plugins: [react()],
    server: {
      port: env.VITE_PORT,
      proxy: {
        [env.VITE_API]: {
					changeOrigin: true,
					// rewrite: path => path.replace(/^\/api/, ''),
          //本地localhost
					target: "http://localhost:8000"
				},
      }
    },
    resolve: {
      alias: {
        "@": pathResolve("src"),
      },
    }
  })
}
