import express from "express";
const app = express();
import connectDB from "./Loader/db";

// Connect Database
connectDB();

app.use(express.json());

app.use("/api/posts", require('./api/post'));
app.use("/api/users", require("./api/users"));
app.use("/api/auth", require("./api/auth"));

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in desvelopment
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "production" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app
  .listen(5000, () => {
    console.log(`
    ################################################
    🛡️  Server listening on port: 5000 🛡️
    ################################################
  `);
  })
  .on("error", (err) => {
    console.error(err);
    process.exit(1);
  });
