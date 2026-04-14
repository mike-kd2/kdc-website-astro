// @ts-check
import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import cloudflare from '@astrojs/cloudflare'
import icon from 'astro-icon'

const isDev = process.env.NODE_ENV !== 'production'

export default defineConfig({
  site: 'https://klauserdesigns.ch',
  output: 'static',
  adapter: isDev ? undefined : cloudflare(),
  integrations: [react(), sitemap(), icon()],
})
