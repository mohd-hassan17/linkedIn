import mongoose from "mongoose";

const dbConnection = async () => {
    if (mongoose.connections[0].readyState === 1) {
        return;
    }

    try {
         await mongoose.connect(process.env.MONGODB_URI || "");
    } catch (error) {
        console.error("Database connection failed:", error);
        process.exit(1);
    }
};

export default dbConnection;
