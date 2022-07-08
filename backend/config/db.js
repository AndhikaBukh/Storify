const mongoose = require('mongoose');
const connectDB = async () => {
    await mongoose.connect(process.env.MONGDB_CONNECTION, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log(`MongoDB Connected`)
    }).catch((err) => {
        console.log(err)
    })
}

module.exports = connectDB;
