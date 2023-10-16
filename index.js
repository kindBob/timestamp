const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());

app.use(express.static("public"));

app.get("/api", (req, res) => {
    res.json({
        unix: new Date().getTime(),
        utc: new Date().toUTCString(),
    });
});

app.get("/api/:date", (req, res) => {
    if (!req.params.date) {
        res.json({
            unix: Date.now(),
            utc: new Date().toUTCString(),
        });
    }

    const dateInput = req.params.date;
    let date = new Date(dateInput);

    if (date.toString() == "Invalid Date") {
        date = new Date(parseInt(dateInput));

        if (date.toString() == "Invalid Date") {
            res.json({ error: "Invalid Date" });

            return;
        }
    }
    res.json({ unix: Date.parse(date), utc: date.toUTCString() });
});

// listen for requests :)
const listener = app.listen(3000, () => {
    console.log("Your app is listening on port " + listener.address().port);
});
