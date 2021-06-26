const bodyParser = require("body-parser");
const express = require("express");

const jsonParser = bodyParser.json();

const app = express();
const port = 3000;

app.use(jsonParser);

app.use("/v1", require("./v1"));

app.listen(port, () => console.log(`app listening on port ${port}`));
