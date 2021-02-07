const express = require("express");
const limit = require("express-rate-limit");
const http = require("http");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  limit({
    windowMs: 1000,
    max: 1,
    handler: (req, res, next) => {
      res.status(req.body.data.status);
      res.send(req.body.data.message);
    },
  })
);
app.post("/", function (req, res) {
  res.status(200).send("got it");
});

const srv = http.createServer(app);
srv.listen(3000, () => {
  console.clear();
  console.log("lets do diz");
});
