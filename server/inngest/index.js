import { Inngest } from "inngest";
import connectDB from "../configs/db.js";
import User from "../models/User.js";

export const inngest = new Inngest({
  id: "quickshow-app",
  name: "Quickshow App",
  signingKey: process.env.INNGEST_SIGNING_KEY,
});

export const functions = [
  // 🟢 CREATE user
  inngest.createFunction(
    { id: "clerk-user-created" },
    { event: "clerk/user.created" },
    async ({ event }) => {
      await connectDB();
      const { id, first_name, last_name, email_addresses, image_url } = event.data;

      const userData = {
        _id: id,
        name: `${first_name || ""} ${last_name || ""}`.trim(),
        email: email_addresses?.[0]?.email_address || "",
        image: image_url,
      };

      const newUser = await User.create(userData);
      return { success: true, userId: newUser._id };
    }
  ),

  // 🟡 UPDATE user
  inngest.createFunction(
    { id: "clerk-user-updated" },
    { event: "clerk/user.updated" },
    async ({ event }) => {
      await connectDB();
      const { id, first_name, last_name, email_addresses, image_url } = event.data;

      const updateData = {
        name: `${first_name || ""} ${last_name || ""}`.trim(),
        email: email_addresses?.[0]?.email_address || "",
        image: image_url,
      };

      const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true, upsert: true });
      return { success: true, userId: updatedUser._id };
    }
  ),

  // 🔴 DELETE user
  inngest.createFunction(
    { id: "clerk-user-deleted" },
    { event: "clerk/user.deleted" },
    async ({ event }) => {
      await connectDB();
      const { id } = event.data;
      await User.findByIdAndDelete(id);
      return { success: true, userId: id };
    }
  ),
];
