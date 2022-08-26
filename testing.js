bookings = [
    {
        "id": 5,
        "roomId": 3,
        "title": "Madam",
        "firstName": "Anuradha",
        "surname": "Selvam",
        "email": "anu@selvam.net",
        "checkInDate": "2017-08-30",
        "checkOutDate": "2017-10-02"
    }
];

req = {
    params: {
        id: 5,
    },
    body : {
        roomId: 99,
        title: "Mr",
        firstName: "Baz",
        surname: "Murphy",
        email: "bazmurphy@github.com",
        checkInDate: "2022-08-26",
        checkOutDate: "2022-08-28"
    }
};

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

let propertiesUpdatedStepOne = [];

for (let property in propertiesUpdated) {
    propertiesUpdatedStepOne.push(`${property}:${propertiesUpdated[property]}`)
}

let propertiesUpdatedStepTwo = propertiesUpdatedStepOne.join(", ");

// console.log(propertiesUpdated);
// console.log(propertiesUpdatedStepOne);
// console.log(propertiesUpdatedStepTwo);
console.log(`Booking update : ${propertiesUpdatedStepTwo}`);