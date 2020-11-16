const axios = require("axios");
const cors = require("cors");
const express = require("express"),
  bodyParser = require("body-parser"),
  jwt = require("jsonwebtoken"),
  app = express();

const config = {
  llave: "miclaveultrasecreta123*",
};

app.use(cors({ credentials: true }));

app.set("llave", config.llave);
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

// app.use(function (req, res, next) {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type");
//   res.setHeader("Access-Control-Allow-Credentials", true);
//   next();
// });

app.listen(8081, () => {
  console.log("Servidor iniciado en el puerto 8081");
});

app.get("/", function (req, res) {
  res.json({ message: "recurso de entrada" });
});

app.post("/autenticar", (req, res) => {
  console.log(req.body);
  if (req.body.usuario === "asfo" && req.body.contrasena === "holamundo") {
    const payload = {
      check: true,
    };
    const token = jwt.sign(payload, app.get("llave"), {
      expiresIn: 1440,
    });

    axios
      .post(
        " https://5lx3ecrtcl.execute-api.us-east-2.amazonaws.com/dev/ingreso",
        { token: token }
      )
      .then(function (response) {
        res.json({
          mensaje: "Autenticación correcta",
          token: token,
        });
      })
      .catch(function (err) {
        res.json({
          mensaje: "Autenticación correcta",
          token: token,
        });
      });
  } else {
    res.json({ mensaje: "Usuario o contraseña incorrectos" });
  }
});

app.post("/is_authenticated", (req, res) => {
  axios
    .get(
      "https://5lx3ecrtcl.execute-api.us-east-2.amazonaws.com/dev/ingreso/" +
        req.body.token
    )
    .then(function (response) {
      res.json({
        mensaje: "ok",
      });
    })
    .catch(function (err) {
      res.json({
        mensaje: "fail",
      });
    });
});
