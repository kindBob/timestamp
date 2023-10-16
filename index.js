require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());

app.use(express.static("public"));

app.get("/api/:date", (req, res) => {
    const dateInput = req.params.date;
    let date = new Date(dateInput);

    if (date.toString() == "Invalid Date") {
        date = new Date(parseInt(dateInput) * 1000);
    }
    res.json({ unix: Date.parse(date), utc: date.toUTCString() });
});

const listener = app.listen(3000, () => {
    console.log("Your app is listening on port " + listener.address().port);
});
