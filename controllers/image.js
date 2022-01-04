const Clarifai = require("clarifai");

const app = new Clarifai.App({
  apiKey: "57603ec762b042e59c496693dae06a12",
});

const handleApiCall = (req, res) => {
  app.models
    .predict("c0c0ac362b03416da06ab3fa36fb58e3", req.body.input)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json("Unable to work with API");
    });
};

const handleImage = (req, res, db) => {
  const { id } = req.body;
  db("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then((entries) => {
      res.json(entries[0]);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json("Unable to get entries");
    });
};

module.exports = {
  handleImage: handleImage,
  handleApiCall: handleApiCall,
};
