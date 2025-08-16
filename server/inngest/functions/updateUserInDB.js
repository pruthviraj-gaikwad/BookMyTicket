// inngest/functions/updateUserInDB.js
import { inngest } from "../index.js";
import connectDB from "../../configs/db.js";
import User from "../../models/User.js";

export const updateUserInDB = inngest.createFunction(
    { name: "Update User in MongoDB" },
    { event: "app.user.update" }, // custom Inngest event, or any trigger you want
    async ({ event }) => {
        await connectDB();

        const { id, updateData } = event.data;
        if (!id) throw new Error("User ID is required");
        if (!updateData || Object.keys(updateData).length === 0) throw new Error("No update data provided");

        const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedUser) throw new Error("User not found");

        console.log("✅ User updated in MongoDB:", updatedUser);
        return updatedUser;
    }
);
