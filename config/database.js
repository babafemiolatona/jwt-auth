const mongoose = require('mongoose');

const { MONGO_URI } = process.env;

exports.connect = () => {
    mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useCreateIndex: true,
        // useFindAndModify: false,
    })
    .then(() => {
        console.log("Sucessfully connected to the database");
    })
    .catch((error) => {
        console.log("Database connection failed. exiting now...");
        console.error(error);
        process.exit(1);
    });
}