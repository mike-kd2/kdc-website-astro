// @ts-check
import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import cloudflare from '@astrojs/cloudflare'
import icon from 'astro-icon'

export default defineConfig({
  site: 'https://klauserdesigns.ch',
  output: 'static',
  adapter: cloudflare(),
  integrations: [react(), sitemap(), icon()],
})
