import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    _id: { type: String },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    image: { type: String }
});

// Don't define _id at all → MongoDB will auto-generate it
export default mongoose.models.User || mongoose.model("User", userSchema);
