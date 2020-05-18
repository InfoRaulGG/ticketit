const Ticket = require("../models/ticket")
const fs = require("fs");

module.exports = {

    getAll(req, res, next) {

        Ticket.find().sort({ createdAt: 'desc' })
            .then(tickets => {
                return res.status(200).send({
                    tickets
                });
            })
            .catch(next);

    },

    getByActive(req, res, next) {

        let isActiveCheck = req.params.isActive.toLowerCase() === "true" ? true : false;

        Ticket.find().sort({ createdAt: 'desc' })
            .then(tickets => {
                let returnTickets = tickets.filter(x => x.isActive == isActiveCheck);
                return res.status(200).send({
                    returnTickets
                });
            })
            .catch(next);
    },

    getById(req, res, next) {

        let ticketId = req.params.id;

        Ticket.findById(ticketId)
            .then(ticket => {
                if (!ticket) {
                    return res.status(400).send({ Message: "Ticket not found" });
                }

                return res.status(200).send({
                    Ticket: ticket
                });
            })
            .catch(next);
    },

    post(req, res, next) {

        const ticket = new Ticket(req.body);
        Ticket.create(ticket)
            .then(ticket => {
                return res.status(201).send({
                    Message: "Ticket createad succesfully.",
                    Ticket: ticket
                })
            })
            .catch(next);

    },

    delete(req, res, next) {
        let projectId = req.params.id;

        Ticket.findByIdAndRemove(projectId)
            .then(ticket => {
                return res.status(200).send({
                    Message: "Deleted item",
                    Ticket: ticket
                })
            })
            .catch(next);
    },

    update(req, res, next) {
        let ticketId = req.params.id;

        let objectUpdated = req.body;

        Ticket.findByIdAndUpdate(ticketId, objectUpdated)
            .then(ticket => {
                return res.status(200).send({
                    Message: "Ticket updated sucesfully",
                    Ticket: objectUpdated
                });
            })
            .catch(next);
    },

    uploadFile(req, res, next) {
        let ticketId = req.params.id;
        if (req.files) {

            let filePath = req.files.file.path;
            let fileSplit = filePath.split('\\');
            let fileName = fileSplit[1];
            let extSplit = fileName.split(".");

            if (extSplit[1] === "doc" || extSplit[1] === "docx" || extSplit[1] === "txt" || extSplit[1] === "xls" || extSplit[1] === "xlsx") {

                Ticket.findByIdAndUpdate(ticketId, { file: filePath }, { new: true })
                    .then(ticket => {
                        return res.status(200).send({
                            Message: "Upload succesfull",
                            files: fileName
                        });
                    })
                    .catch(next);
            } else {

                fs.unlink(filePath, (error) => {
                    return res.status(301).send({
                        Message: "Extension of file not valid"
                    })
                })
            }
        } else {
            return res.status(301).send({
                Message: "Files not detected"
            })
        }
    }
}