import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // Ee line add cheyi

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // Tailwind ni plugin ga add cheyi
  ],
})