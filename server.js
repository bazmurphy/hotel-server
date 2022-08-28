const express = require("express");
const app = express();

const PORT = 3001;

const cors = require("cors");
app.use(cors());

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(express.static("public"));

const bookings = require("./bookings.json");
const customers = require('./customers.json');


// ========== GET ========== c.R.u.d (READ)

app.get("/", function (req, res) {
    // console.log("GET / route");
    res.sendFile(__dirname + "/index.html");
});

app.get("/bookings", function (req, res) {
    // console.log("GET /bookings route");
    res.status(200).json(bookings);
});

app.get("/bookings/:id", function (req, res) {
    // console.log(console.log("GET /bookings/:id route"))
    const indexOfBooking = bookings.findIndex(element => element.id === Number(req.params.id));
    if (indexOfBooking > -1) {
        res.status(200).json(bookings[indexOfBooking]);
    } else {
        res.status(404).json({ message: `Booking ID ${req.params.id} was not found`});
    };
});

app.get('/customers', (req, res) => {
    // console.log(console.log("GET /customers route"))
    res.status(200).json(customers);
})

app.get('/customers/:id', (req, res) => {
    // console.log(console.log("GET /customers/:id route"))
    const customer = customers.find(element => element.id === Number(req.params.id));
    if (customer) {
        res.status(200).json(customer);
    } else {
        res.status(404).json({ message: `Customer ID ${req.params.id} was not found`});
    }
})

// app.get('/delayed', (req, res) => {
//   setTimeout(() => {
//     res.json(bookings)
//   }, 5000)
// })

// app.get('/error', (req, res) => {
//   res.status(500).send({ error: 'Whoops something went wrong!' })
// })


// ========== POST ========== C.r.u.d (Create)

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
    console.log(`Booking ID ${bookingToAdd.id} was Added...`);
    res.status(200).json({message: `Booking ID ${bookingToAdd.id} was Added`});
});


// ========== FOR HTML/REACT FORMS ==========

app.post("/bookings/update", function (req, res) {
    // console.log("POST /bookings/update route");
    console.log(req.body);

    const indexOfBookingToUpdate = bookings.findIndex(element => element.id === Number(req.body.id));
    console.log(`indexOfBookingToUpdate ${indexOfBookingToUpdate}`);

    if (indexOfBookingToUpdate > -1) {
        console.log(`Booking with ${req.body.id} found at index ${indexOfBookingToUpdate}, Updating...`)

        if (req.body.roomId) {
            bookings[indexOfBookingToUpdate].roomId = req.body.roomId;
        }
        if (req.body.title) {
            bookings[indexOfBookingToUpdate].title = req.body.title;
        }
        if (req.body.firstName) {
            bookings[indexOfBookingToUpdate].firstName = req.body.firstName;
        }
        if (req.body.surname) {
            bookings[indexOfBookingToUpdate].surname = req.body.surname;
        }
        if (req.body.email) {
            bookings[indexOfBookingToUpdate].email = req.body.email;
        }
        if (req.body.checkInDate) {
            bookings[indexOfBookingToUpdate].checkInDate = req.body.checkInDate;
        }
        if (req.body.checkOutDate) {
            bookings[indexOfBookingToUpdate].checkOutDate = req.body.checkOutDate;
        }

        res.status(200).json({message: `Booking ID ${req.body.id} was Updated`});
    } else {
        console.log(`Booking with ${req.body.id} was not found`);
        res.status(404).json({message: `Booking ID ${req.body.id} was not found`});
    }

});

app.post("/bookings/delete", function (req, res) {
    // console.log("POST /bookings/delete route");
    console.log(req.body);

    const indexOfBookingToDelete = bookings.findIndex(element => element.id === Number(req.body.id));
    console.log(`indexOfBookingToDelete ${indexOfBookingToDelete}`);

    if (indexOfBookingToDelete > -1) {
        console.log(`Booking with ${req.body.id} found at index ${indexOfBookingToDelete}, Deleting...`)
        bookings.splice(indexOfBookingToDelete, 1);
        res.status(200).json({message: `Booking ID ${req.body.id} was Deleted`});
    } else {
        console.log(`Booking ID ${req.body.id} was not found`);
        res.status(404).json({message: `Booking ID ${req.body.id} was not found`});
    };

});


// ========== PUT ========== c.r.U.d (Update)

app.put("/bookings/:id", function (req, res) {
    // console.log("PUT /bookings/:id route");
    const indexOfBookingToUpdate = bookings.findIndex(element => element.id === Number(req.params.id));

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
    console.log(propertiesUpdated);
});

// ========== DELETE ========== c.r.u.D (Delete)

app.delete("/bookings/:id", function (req, res) {
    // console.log("DELETE /bookings/:id route");
    const indexOfBookingToDelete = bookings.findIndex(element => element.id === Number(req.params.id));
    if (indexOfBookingToDelete > -1) {
        bookings.splice(indexOfBookingToDelete, 1);
        res.status(200).json({message: `Booking ID ${req.params.id} was Deleted`})
    } else {
        res.status(404).json({message: `Booking ID ${req.params.id} was not found`})
    };
});

const listener = app.listen(process.env.PORT || PORT, function() {
    console.log("Your app is listening on port " + listener.address().port);
});