// inngest/functions/deleteUserInDB.js
import { inngest } from "../index.js";
import connectDB from "../../configs/db.js";
import User from "../../models/User.js";

export const deleteUserInDB = inngest.createFunction(
    { name: "Delete User in MongoDB" },
    { event: "app.user.delete" }, // custom Inngest event, or any trigger you want
    async ({ event }) => {
        await connectDB();

        const { id } = event.data;
        if (!id) throw new Error("User ID is required");

        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) throw new Error("User not found");

        console.log("✅ User deleted in MongoDB:", deletedUser);
        return { message: "User deleted successfully" };
    }
);
