const express = require("express");
const app = express();
const path = require("path");
const routes = require("./routes/routes");
const port = process.env.PORT || 3000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", routes);
app.use(express.static(path.join(__dirname, "../public")));

// set the view engine to ejs
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  }
  console.log("listening on port 3000");
});
