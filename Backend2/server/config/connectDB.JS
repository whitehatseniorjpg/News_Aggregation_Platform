import mongoose from "mongoose";

const connectDB = async () => {

    try {
console.log("MONGO_URL =", process.env.MONGO_URL);
        await mongoose.connect(
            process.env.MONGO_URL
        );

        console.log(
            "MongoDB Connected Successfully"
        );

    }
    catch(error) {

        console.log(
            "MongoDB Connection Failed"
        );

        console.log(error);

        process.exit(1);
    }
};

export default connectDB;