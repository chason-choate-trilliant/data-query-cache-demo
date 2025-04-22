import express from "express";
import cors from 'cors';

const app = express()
const port = 3002
const corsOptions = {
  origin: 'https://home.cachetest.io',
  allowedHeaders: ['Content-Type', 'Authorization', 'If-None-Match'],
  methods: ['DELETE', 'OPTIONS', 'PATCH', 'PUT'],
  exposedHeaders: ['Etag'],
  credentials: true,
  optionsSuccessStatus: 200,
}

app.set('etag', false)
app.use((req, res, next) => {
  console.log(req.method, req.originalUrl, req.headers)
  next()
})
app.use((req, res, next) => {
  res.setHeader("Strict-Transport-Security", "max-age=300; includeSubDomains; preload");
  next()
});
app.use(cors(corsOptions))

app.post("/search:create", (req, res)  => {
  console.log(req.method, req.originalUrl, req.headers)
  const newURL = URL.parse('http://example.com/search:execute')
  newURL.searchParams.append('q', btoa("test"))
  const path = newURL.pathname + newURL.search
  console.log("Redirecting to:", path)
  res.redirect(303, path)
});
app.get("/search:execute", async (req, res)  => {
  if (!req.headers['authorization']) {
    console.log("401 Unauthorized")
    res.status(401).send()
    return
  }
  if (req.header('If-None-Match') === '12345') {
    console.log("304 Not Modified")
    res.status(304).send()
    return
  }
  await new Promise(resolve => setTimeout(resolve, 5000))
  res.setHeader('Cache-Control', 'private,no-cache');
  res.setHeader('Etag', '12345');
  res.send({ one: 'test', two: 'test' })
});

app.listen(port, () => {
  console.log(`API listening on port ${port}`)
})
