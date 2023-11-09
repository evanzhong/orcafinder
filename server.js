require("dotenv").config();
const express = require("express");
const fetch = require("node-fetch");

const app = express();
const PORT_NUM = 8080;
const STYLES_API_URL = `https://api.maptiler.com/maps/streets/style.json?key=${process.env.MAPTILER_API_KEY}`;
const VEHICLE_POSITIONS_PB_LIVE_API_URL = "https://s3.amazonaws.com/kcm-alerts-realtime-prod/vehiclepositions_pb.json";

app.set("view engine", "pug");

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index", {});
});

app.get("/proxy", (req, res) => {
  fetch(VEHICLE_POSITIONS_PB_LIVE_API_URL)
    .then((response) => response.json())
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({
        error: "An error occurred while fetching live vehicle position data",
      });
    });
});

app.get("/map-styles", (req, res) => {
  fetch(STYLES_API_URL)
    .then((response) => response.json())
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.error(error);
      res
        .status(500)
        .json({ error: "An error occurred while fetching map styles" });
    });
});

app.listen(PORT_NUM, () => {
  console.log(`Server listening on port ${PORT_NUM}`);
});
