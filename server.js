const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 3500;
const express = require("express");
const db = require("./database");
const cors = require("cors");
const cookie_parser = require("cookie-parser");
const app = express();
app.use(cors());
app.use(express.json());
app.use(cookie_parser());
db();

app.get("/", (req, res) => {
  try {
    const home = {
      title: "Welcome to React",
      description:
        "Lorem ipsum dolor sit amet. Eum amet reiciendis vel possimus nobis qui aperiam quibusdam est debitis iure. Est voluptatem quia 33 expedita laborum eum ratione accusamus et optio pariatur ut enim dolor? Qui quas mollitia ea nihil odio ad repellat officiis sed explicabo eaque! Est repudiandae quaerat est dolor earum ut quibusdam illo aut illum fuga est quas perspiciatis ad laboriosam galisum et dolores nihil.Rem nemo eligendi et reiciendis asperiores aut sunt impedit! Ut sint reiciendis est mollitia alias qui doloribus autem sed dolore perferendis a possimus nulla.",
    };
    res.status(200).send(home);
  } catch (error) {
    res.status(500).send({ message: "Something went wrong", error });
  }
});

app.use("/auth", require("./Routes/AuthRoutes"));
app.use("/products", require("./Routes/ProductRoutes"));
app.use("/users", require("./Routes/UserRoutes"));

app.listen(PORT, () => {
  console.log("server is up on http://localhost:3500");
});
