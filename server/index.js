import express from "express";
import route from "./routers/index";
//import bodyParser from "body-parser";

const app = express();

const PORT = process.env.PORT || 5000;

//body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: false})); 

// app.get("/", (req, res) => {
//     res.send("The API is working");
// });

app.use("/api/v1", route);

app.listen(PORT, (req, res) => console.log(`Server started @ port ${PORT}`));

export default app;
// module.exports = app;