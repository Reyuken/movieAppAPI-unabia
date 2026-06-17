const dotenv = require('dotenv');
const express = require("express");
const mongoose = require("mongoose");

const cors = require('cors');

const userRoutes = require("./routes/user");
const movieRoutes = require("./routes/movies");

const app = express();
const port = 4000;

dotenv.config();

mongoose.connect(process.env.MONGODB_STRING);

let db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error"));

mongoose.connection.once('open', () => console.log('Now connected to MongoDB Atlas.'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const corsOptions = {
    // origin: ['http://localhost:8000'],
    origin: '*',
    credentials: true,
    optionsSuccessStatus: 200
};

app.use("/movies", movieRoutes);
app.use("/users", userRoutes);

if (require.main === module) {
    app.listen(process.env.PORT || 3000, () => console.log(`Server running at port ${process.env.PORT || 3000}`));
};

module.exports = { app, mongoose };
