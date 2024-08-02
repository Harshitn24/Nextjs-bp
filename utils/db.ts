import mongoose from 'mongoose';


const connectDB = async () => {
    if (mongoose.connection.readyState >= 1) return;

    const mongoDBUrl = process.env.MONGODB_URL;

    if (!mongoDBUrl) {
        throw new Error('MONGODB_URL is not defined in environment variables');
    }

    mongoose.connect(mongoDBUrl)
        .then(() => {
            console.log('Connected to MongoDB');
        })
        .catch((error) => {
            console.error('Error connecting to MongoDB:', error);
        });
};

export default connectDB;
