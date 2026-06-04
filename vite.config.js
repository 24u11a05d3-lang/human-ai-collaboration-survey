export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    // This tells Vite it's completely safe to allow localtunnel domains
    allowedHosts: 'all', 
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})