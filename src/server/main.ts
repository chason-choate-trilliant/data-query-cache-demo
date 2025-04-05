import express from "express";
import ViteExpress from "vite-express";

const app = express();

app.get("/hello", (_, res) => {
  res.send("Hello Vite + TypeScript!");
});

app.get("/server", (req, res)  => {
  res.setHeader('Cache-Control', 'private,no-cache,max-age=60');
  res.setHeader('Etag', '12345');
  res.send({ one: 'test', two: 'test '});
});
app.post("/server", (req, res)  => {
  res.setHeader('Cache-Control', 'private,no-cache,max-age=60');
  res.setHeader('Etag', '12345');
  res.send({ one: 'test', two: 'test '});
});

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000..."),
);
