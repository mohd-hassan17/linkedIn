import mongoose from "mongoose";

const dbConnection = async () => {
    if (mongoose.connections[0].readyState === 1) {
        console.log("Database already connected");
        return;
    }

    try {
        const db = await mongoose.connect(process.env.MONGODB_URL || "");
        console.log(`Connected to DB: ${db.connection.name}`);
    } catch (error) {
        console.error("Database connection failed:", error);
        process.exit(1);
    }
};

export default dbConnection;
