const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TicketSchema = new Schema({
    title: {
        type: String,
        required: "The title of ticket is required"
    },
    description: {
        type: String,
        required: "The description of ticket is required"
    },
    level: {
        type: String,
        enum: ["low", "medium", "high"]
    },
    isActive: {
        type: Boolean,
        required: "The isActive is required"
    },
    file: {
        type: String,
    },
    teamMembers: [{
        type: String,
    }],
}, {
    timestamps: true
});

const ticket = mongoose.model("ticket", TicketSchema);
module.exports = ticket;