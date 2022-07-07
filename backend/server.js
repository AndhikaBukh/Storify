require('dotenv').config();
const express = require('express');
const session = require('express-session');

const app = express();
const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';
const errorHandler = require('./middleware/error');

// Connect to MongoDB
const connectDB = require('./config/db');
connectDB();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
    }
}))

app.use("/api/", require('./routes/auth.routes'));
app.use("/api/", require('./routes/user.routes'));
app.use("/api/", require('./routes/post.routes'));
app.use("/api/", require('./routes/comment.routes'));

// error handler
app.use(errorHandler);

const server = app.listen(port, () => {
    console.log(`Server running at http://${host}:${port}/`);
})

process.on("unhandledRejection", (err, promise) => {
    console.log(`Logged Error: ${err}`);
    server.close(() => process.exit(1))
})