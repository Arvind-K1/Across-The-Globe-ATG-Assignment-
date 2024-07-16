import mongoose from "mongoose";

const dbConnection = async ()=> {
    try {
        const connect = await mongoose.connect(`${process.env.MONGO_URI}`);
        if(connect){
            console.log(`Database connected on Port ${connect.connection.host}`);
        }
    } catch (error) {
        console.log(error.message);
    }
};

export default dbConnection
