import connectDB from "../server/configs/db.js";
import User from "../server/models/User.js";

export default async function handler(req, res) {
    await connectDB();

    if (req.method === "POST") { // Using POST to update
        try {
            const { id, ...updateData } = req.body;
            if (!id) return res.status(400).json({ success: false, error: "ID is required" });

            const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true });
            if (!updatedUser) return res.status(404).json({ success: false, error: "User not found" });

            return res.status(200).json({ success: true, user: updatedUser });
        } catch (err) {
            return res.status(500).json({ success: false, error: err.message });
        }
    }

    return res.status(405).json({ success: false, error: "Method not allowed" });
}
