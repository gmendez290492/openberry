const express = require("express");
const app = express();
app.listen(4000, () => {
 console.log (String.fromCodePoint(0x1F354));
});

app.get('/', function (req, res) {
  res.json({ a: String.fromCodePoint(0x1F354) });
});
