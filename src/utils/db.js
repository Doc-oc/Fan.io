import mongoose from "mongoose";

const connect = async () => {
    if(mongoose.connections[0].readyState) return;

    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Mongo connection successful");

    } catch(error) {
        console.log(error);
        throw new Error ("Error connecting to Mongo...")
    }
}

export default connect;