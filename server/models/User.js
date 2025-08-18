import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    _id: { type: String },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    image: { type: String }
});

export default mongoose.models.User || mongoose.model("User", userSchema);
