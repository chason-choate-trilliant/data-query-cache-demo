import express from "express";
import ViteExpress from "vite-express";

const app = express();

app.post("/search:create", (req, res)  => {
  console.log("POST /search")
  const newURL = URL.parse('http://localhost:3000/search:execute')
  newURL.searchParams.append('q', btoa(req.body))
  console.log("Redirecting to:", newURL.toString())
  res.redirect(303, newURL.toString())
});
app.get("/search:execute", async (req, res)  => {
  console.log("GET /search")
  if (req.header('If-None-Match') === '12345') {
    console.log("304 Not Modified")
    res.status(304).send()
    return
  }
  await new Promise(resolve => setTimeout(resolve, 5000))
  res.setHeader('Cache-Control', 'private,no-cache,max-age=60');
  res.setHeader('Etag', '12345');
  res.send({ one: 'test', two: 'test' })
});

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000..."),
);
