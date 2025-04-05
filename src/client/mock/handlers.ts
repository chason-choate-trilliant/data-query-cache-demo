import { http, HttpResponse } from 'msw'

export const handlers = [
  http.get('http://localhost:3000/mock', ({ request }) => {
    if (request.headers.get('If-None-Match') === '12345') {
      return HttpResponse.json(null, { status: 304 })
    }
    return HttpResponse.json(
      { one: 'test', two: 'test ' },
      { status: 200, headers: { 'Cache-Control': 'private,no-cache', Etag: '12345' } }
      )
  }),
]
