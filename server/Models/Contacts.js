const mongoose = require("mongoose");

const contactsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "There must be a name"],
    },
    email: {
        type: String,
        required: [true, "There must be an email for communication purpose"],
        unqiue: true,
    },
    msg: {
        type: String,
    },
});

//creating a model for users
const contacts = mongoose.model("contacts", contactsSchema);
module.exports = contacts;
