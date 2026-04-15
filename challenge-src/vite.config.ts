import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // IMPORTANT: Update this to your repository name for GitHub Pages deployment.
  // For example, if your repository is at https://github.com/user/my-repo,
  // set base to '/my-repo/'.
  base: '/2026/challenge/',
})
