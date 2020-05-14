module.exports = {
    getAll(req, res) {
        return res.status(200).send({
            data: [{
                    name: "hello"
                },
                {
                    name: "world"
                }
            ]
        });
    },
    getDetails(req, res) {

    },
    post(req, res) {

    },
    delete(req, res) {

    },
    put(req, res) {

    }
}