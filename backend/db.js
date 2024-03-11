const mongoose = require("mongoose");
const mongoURL = "mongodb+srv://nishantrao03:aZ$9_Ym5w6DgQeG@atlascluster.nend5c5.mongodb.net/ChronoCraft_data?retryWrites=true&w=majority&appName=AtlasCluster";

const connectDB = async () => {
    try {
        await mongoose.connect(mongoURL, { useNewUrlParser: true });
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};

module.exports = connectDB;
