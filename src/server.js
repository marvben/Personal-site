const compression = require("compression");
const express = require("express");
const app = express();
const path = require("path");
const routes = require("./routes/routes");
const port = process.env.PORT || 3000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// compress all responses. Should be placed before all routes
app.use(compression());
app.use( routes);
app.use(express.static(path.join(__dirname, "../public")));

// set the view engine to ejs
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));

//adding expire headers
app.use(
  express.static(path.join(__dirname, "../public"), {
    maxAge: 86400000,
    setHeaders: function (res, path) {
      res.setHeader("Expires", new Date(Date.now() + 2592000000 * 30).toUTCString());
    },
  })
);

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  }
  console.log("listening on port 3000");
});
