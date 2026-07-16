import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { existsSync, statSync, createReadStream } from 'node:fs'
import { join, extname } from 'node:path'

const MIME: Record<string, string> = {
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.mov': 'video/quicktime',
}

// Dev-only workaround: this Vite 8 dev server doesn't serve some nested /public
// subfolders (e.g. assets/images/<project>/). Production builds copy /public
// verbatim, so this only patches local dev. Serves media files straight from disk.
function serveNestedPublicMedia(): Plugin {
  return {
    name: 'serve-nested-public-media',
    apply: 'serve',
    configureServer(server) {
      const publicDir = server.config.publicDir
      server.middlewares.use((req, res, next) => {
        const url = decodeURIComponent((req.url ?? '').split('?')[0])
        const ext = extname(url).toLowerCase()
        const type = MIME[ext]
        if (!type) return next()
        const filePath = join(publicDir, url)
        if (!filePath.startsWith(publicDir) || !existsSync(filePath) || !statSync(filePath).isFile()) {
          return next()
        }
        const { size } = statSync(filePath)
        res.setHeader('Content-Type', type)
        res.setHeader('Accept-Ranges', 'bytes')
        res.setHeader('Cache-Control', 'no-cache')

        // Byte-range support — <video> playback/seek needs 206 responses.
        const range = req.headers.range
        if (range) {
          const m = /bytes=(\d*)-(\d*)/.exec(range)
          let start = m && m[1] ? parseInt(m[1], 10) : 0
          let end = m && m[2] ? parseInt(m[2], 10) : size - 1
          if (Number.isNaN(start)) start = 0
          if (Number.isNaN(end) || end >= size) end = size - 1
          if (start > end) {
            res.statusCode = 416
            res.setHeader('Content-Range', `bytes */${size}`)
            return res.end()
          }
          res.statusCode = 206
          res.setHeader('Content-Range', `bytes ${start}-${end}/${size}`)
          res.setHeader('Content-Length', end - start + 1)
          createReadStream(filePath, { start, end }).pipe(res)
        } else {
          res.setHeader('Content-Length', size)
          createReadStream(filePath).pipe(res)
        }
      })
    },
  }
}

export default defineConfig({
  plugins: [serveNestedPublicMedia(), tailwindcss(), react()],
})
