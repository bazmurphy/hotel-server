const express = require("express");
const app = express();

const PORT = 3001;

const cors = require("cors");
app.use(cors());

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(express.static("public"));

const bookings = require("./bookings.json");

app.get("/", function (req, res) {
    // console.log("GET / route");
    res.send("Hotel Server API");
});

app.get("/bookings", function (req, res) {
    // console.log("GET /bookings route");
    res.send(bookings);
});

app.get("/bookings/:id", function (req, res) {
    // console.log(console.log("GET /bookings/:id route"))
    const indexOfBooking = bookings.findIndex(element => element.id === Number(req.params.id));
    if (indexOfBooking > -1) {
        res.send(bookings[indexOfBooking]);
    } else {
        res.sendStatus(404);
    };
});

app.post("/bookings/add", function (req, res) {
    // console.log("POST /bookings/add route");
    console.log(req.body);
    const bookingToAdd = {
        id: (Number(bookings[bookings.length -1].id) + 1),
        roomId: Number(req.body.roomId),
        title: req.body.title,
        firstName: req.body.firstName,
        surname: req.body.surname,
        email: req.body.email,
        checkInDate: req.body.checkInDate,
        checkOutDate: req.body.checkOutDate,
    };
    bookings.push(bookingToAdd);
    console.log(bookings);
    res.sendStatus(200);
});


// app.put("/bookings/:id", function (req, res) {
//     // console.log("PUT /bookings route");
//     const indexOfBookingToUpdate = bookings.findIndex(element => element.id === Number(req.params.id));

//     let propertiesUpdated = {};
    
//     if (req.body.roomId) {
//         propertiesUpdated.roomId = req.body.roomId;
//         bookings[indexOfBookingToUpdate].roomId = req.body.roomId;
//     }
//     if (req.body.title) {
//         propertiesUpdated.title = req.body.title;
//         bookings[indexOfBookingToUpdate].title = req.body.title;
//     }
//     if (req.body.firstName) {
//         propertiesUpdated.firstName = req.body.firstName;
//         bookings[indexOfBookingToUpdate].firstName = req.body.firstName;
//     }
//     if (req.body.surname) {
//         propertiesUpdated.surname = req.body.surname;
//         bookings[indexOfBookingToUpdate].surname = req.body.surname;
//     }
//     if (req.body.email) {
//         propertiesUpdated.email = req.body.email;
//         bookings[indexOfBookingToUpdate].email = req.body.email;
//     }
//     if (req.body.checkInDate) {
//         propertiesUpdated.checkInDate = req.body.checkInDate;
//         bookings[indexOfBookingToUpdate].checkInDate = req.body.checkInDate;
//     }
//     if (req.body.checkOutDate) {
//         propertiesUpdated.checkOutDate = req.body.checkOutDate;
//         bookings[indexOfBookingToUpdate].checkOutDate = req.body.checkOutDate;
//     }
    
//     let propertiesUpdatedStepOne = [];
    
//     for (let property in propertiesUpdated) {
//         propertiesUpdatedStepOne.push(`${property}:${propertiesUpdated[property]}`)
//     }
    
//     let propertiesUpdatedStepTwo = propertiesUpdatedStepOne.join(", ");
    
//     // console.log(propertiesUpdated);
//     // console.log(propertiesUpdatedStepOne);
//     // console.log(propertiesUpdatedStepTwo);
//     console.log(`Booking update : ${propertiesUpdatedStepTwo}`);
//     // res.redirect('/');
// });

app.post("/bookings/update", function (req, res) {
    // console.log("PUT /bookings route");
    console.log(req.body);

    const indexOfBookingToUpdate = bookings.findIndex(element => element.id === Number(req.params.id));
    if (indexOfBookingToUpdate > -1) {
        let propertiesUpdated = {};
        
        if (req.body.roomId) {
            propertiesUpdated.roomId = req.body.roomId;
            bookings[indexOfBookingToUpdate].roomId = req.body.roomId;
        }
        if (req.body.title) {
            propertiesUpdated.title = req.body.title;
            bookings[indexOfBookingToUpdate].title = req.body.title;
        }
        if (req.body.firstName) {
            propertiesUpdated.firstName = req.body.firstName;
            bookings[indexOfBookingToUpdate].firstName = req.body.firstName;
        }
        if (req.body.surname) {
            propertiesUpdated.surname = req.body.surname;
            bookings[indexOfBookingToUpdate].surname = req.body.surname;
        }
        if (req.body.email) {
            propertiesUpdated.email = req.body.email;
            bookings[indexOfBookingToUpdate].email = req.body.email;
        }
        if (req.body.checkInDate) {
            propertiesUpdated.checkInDate = req.body.checkInDate;
            bookings[indexOfBookingToUpdate].checkInDate = req.body.checkInDate;
        }
        if (req.body.checkOutDate) {
            propertiesUpdated.checkOutDate = req.body.checkOutDate;
            bookings[indexOfBookingToUpdate].checkOutDate = req.body.checkOutDate;
        }
        
        // let propertiesUpdatedStepOne = [];
        
        // for (let property in propertiesUpdated) {
        //     propertiesUpdatedStepOne.push(`${property}:${propertiesUpdated[property]}`)
        // }
        
        // let propertiesUpdatedStepTwo = propertiesUpdatedStepOne.join(", ");
        
        console.log(propertiesUpdated);
        // console.log(propertiesUpdatedStepOne);
        // console.log(propertiesUpdatedStepTwo);
        // console.log(`Booking update : ${propertiesUpdatedStepTwo}`);
        res.sendStatus(200);
    } else {
        res.sendStatus(404);
    }
});

// app.delete("/bookings/:id", function (req, res) {
//     // console.log("DELETE /bookings/:id route");
//     const indexOfBookingToDelete = bookings.findIndex(element => element.id === Number(req.params.id));
//     if (indexOfBookingToDelete > -1) {
//         bookings.splice(indexOfBookingToDelete, 1);
//         res.send(`Booking ID ${req.params.id} has been deleted`)
//     } else {
//         res.sendStatus(404);
//     };
// });

app.post("/bookings/delete", function (req, res) {
    // console.log("POST /bookings/delete route");
    console.log(req.body);
    const indexOfBookingToDelete = bookings.findIndex(element => element.id === Number(req.body.id));
    if (indexOfBookingToDelete > -1) {
        bookings.splice(indexOfBookingToDelete, 1);
        console.log(bookings);
        // console.log(`Booking ID ${req.body.id} has been deleted`);
        res.sendStatus(200);
    } else {
        // console.log(`Booking ID ${req.body.id} does not exist`);
        res.sendStatus(404);
    };
});

const listener = app.listen(process.env.PORT || PORT, function() {
    console.log("Your app is listening on port " + listener.address().port);
});