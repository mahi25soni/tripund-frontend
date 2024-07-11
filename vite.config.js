import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()], 
  server : {
    port : 3000
  },
  watch:{
    include: ['src/**/*.js', 'src/**/*.vue']
  }
})