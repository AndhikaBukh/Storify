require("dotenv").config();
const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;
const host = process.env.HOST || "localhost";
const errorHandler = require("./middleware/error");

// Connect to MongoDB
const connectDB = require("./config/db");
connectDB();

// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "http://localhost:4000"); // update to match the domain you will make the request from
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        rolling: true,
        cookie: {
            secure: false,
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
        },
    })
);
app.use(cors({ credentials: true, origin: "http://localhost:4000" }));
app.use(cookieParser());

app.use("/api/", require("./routes/auth.routes"));
app.use("/api/", require("./routes/user.routes"));
app.use("/api/", require("./routes/post.routes"));
app.use("/api/", require("./routes/comment.routes"));
app.use("/api/", require("./routes/story.routes"));

// error handler
app.use(errorHandler);

const server = app.listen(port, () => {
    console.log(`Server running at http://${host}:${port}/`);
});

process.on("unhandledRejection", (err, promise) => {
    console.log(`Logged Error: ${err}`);
    server.close(() => process.exit(1));
});
