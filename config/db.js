const mongoose = require('mongoose');
const colors = require('colors');

const connectDB = async() => {
    const connection = await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    });

    console.log(colors.red.bold(`MongoDB Connected ${connection.connection.host}`));
};

module.exports = connectDB;