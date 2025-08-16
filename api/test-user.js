import connectDB from "../server/configs/db.js";
import User from "../server/models/User.js";

export default async function handler(req, res) {
    await connectDB();

    if (req.method === "POST") {
        try {
            const createdUser = await User.create(req.body);
            return res.status(201).json({ success: true, user: createdUser });
        } catch (err) {
            return res.status(500).json({ success: false, error: err.message });
        }
    }

    if (req.method === "GET") {
        try {
            const users = await User.find();
            return res.status(200).json({ success: true, users });
        } catch (err) {
            return res.status(500).json({ success: false, error: err.message });
        }
    }

    return res.status(405).json({ success: false, error: "Method not allowed" });
}
