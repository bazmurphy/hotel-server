const express = require("express");
const app = express();

const PORT = 3000;

const cors = require("cors");
app.use(cors());

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(express.static("public"));

const bookings = require("./bookings.json");

app.get("/", function (req, res) {
    console.log("GET / route");
    res.send("Hotel Server API");
});

app.get("/bookings", function (req, res) {
    console.log("GET /bookings route");
    res.send(bookings);
});

app.get("/bookings/:id", function (req, res) {
    console.log(console.log("GET /bookings/:id route"))
    const indexOfBooking = bookings.findIndex(element => element.id === Number(req.params.id));
    res.send(bookings[indexOfBooking]);
})

app.post("/bookings", function (req, res) {
    console.log("POST /bookings route");
});

app.put("/bookings", function (req, res) {
    console.log("PUT /bookings route");
});

app.delete("/bookings", function (req, res) {
    console.log("DELETE /bookings route");
});

const listener = app.listen(process.env.PORT || PORT, function() {
    console.log("Your app is listening on port " + listener.address().port);
});