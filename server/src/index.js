const express = require("express");
const cors = require("cors");
const moviesRouter = require("./routers/moviesRouter");



require("./db/mongoose");

const port = process.env.PORT;
const app = express();

app.use(express.json());
app.use(cors());
app.use(moviesRouter);


app.get("/", (req, res) => {
    res.send("OK");
});


app.listen(port, () => console.log("Server is connected, Port:", port));


// const getData = require("./data/createData");
// getData("https://hotcinema.co.il/tickets/TheaterEvents")