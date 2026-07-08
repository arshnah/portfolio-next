import type { NextRequest } from 'next/server'

export const config = { matcher: '/' }

const INFO = `
  arsh · arshnah.in

  full-stack solo builder from india. i make things work; making them
  pretty is yashvardhan's job. self-hosted, no black boxes, ships fast.

  building
    wisp        e2ee messenger           https://chat.arshnah.in
    cipherdrop  encrypted drops + veil    https://drop.arshnah.in
    larpring    a webring for larpers     https://ring.arshnah.in

  elsewhere
    github   https://github.com/arshnah
    site     https://arshnah.in

  you curl'd it instead of clicking. respect.
`

export default function middleware(req: NextRequest) {
  const ua = req.headers.get('user-agent') || ''
  if (!/curl|wget|httpie|libcurl|lwp-request/i.test(ua)) return
  const m = ua.match(/curl\/([\d.]+)/i)
  const tail = m ? `  you're on curl/${m[1]}, i see you 😉\n` : ''
  return new Response(INFO + tail, {
    headers: { 'content-type': 'text/plain; charset=utf-8', 'cache-control': 'no-store' },
  })
}
