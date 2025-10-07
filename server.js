// server.js
const jsonServer = require("json-server");
const path = require("path");

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "db.json"));
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.use((req, res, next) => setTimeout(next, 300));

server.post("/products", (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({ error: "نام و قیمت محصول الزامی است." });
  }
  req.body.createdAt = new Date().toISOString();
  next();
});

server.use(router);

const PORT = 4000;
server.listen(PORT, () => {
  console.log(`🚀 Product API running at http://localhost:${PORT}/products`);
});
