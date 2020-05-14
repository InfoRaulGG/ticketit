const app = require("./app");
const db = require("./db/db");

const PORT = process.env.PORT || 4299;

app.listen(PORT, () => {
    console.log("Servidor corriendo en puerto: " + PORT);
});