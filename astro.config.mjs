// @ts-check
import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import icon from 'astro-icon'

export default defineConfig({
  site: 'https://klauserdesigns.ch',
  output: 'static',
  integrations: [react(), sitemap(), icon()],
})
