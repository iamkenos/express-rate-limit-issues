const express = require("express");
const limit = require("express-rate-limit");
const http = require("http");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) =>
  limit({
    windowMs: 1000,
    max: req.body.data.limit,
    handler: (req, res, next) => {
      res.status(req.body.data.status);
      res.send(req.body.data.message);
    },
  })(req, res, next)
);
app.post("/", function (req, res) {
  res.status(200).send("got it");
});

const srv = http.createServer(app);
srv.listen(3000, () => {
  console.clear();
  console.log("lets do diz");
});
