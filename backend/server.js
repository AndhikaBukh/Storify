require('dotenv').config();
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';
const errorHandler = require('./middleware/error');

// Connect to MongoDB
const connectDB = require('./config/db');
connectDB();

app.use(express.json())

app.use("/api/auth", require('./routes/auth.routes'))
app.use("/api/private", require('./routes/private.routes'))

// error handler
app.use(errorHandler);

const server = app.listen(port, () => {
    console.log(`Server running at http://${host}:${port}/`);
})

process.on("unhandledRejection", (err, promise) => {
    console.log(`Logged Error: ${err}`);
    server.close(() => process.exit(1))
})