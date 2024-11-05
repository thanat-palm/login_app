import mongoose from 'mongoose'

export const connectMongoDB = async () => {
    try {

        if (mongoose.connection.readyState === 1) {
            console.log("MongoDB is already connected.");
            return;
        }

        await mongoose.connect(process.env.MONGODB_URI as string);
        console.log("Connected to MongoDB");

    } catch(error) {
        console.log("Error connecting to MongoDB: ", error);
        throw new Error("MongoDB connection failed");
    }
}