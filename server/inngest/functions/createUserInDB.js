// inngest/functions/createUser.js
import { inngest } from "../index.js";
import connectDB from "../../configs/db.js";
import User from "../../models/User.js";

export const createUserInDB = inngest.createFunction(
  { name: "Create User in MongoDB" },
  { event: "clerk.user.created" }, // Listen to Clerk user creation events
  async ({ event }) => {
    await connectDB();

    const { id, email_addresses, first_name, last_name, profile_image_url } = event.data;
    const email = email_addresses?.[0]?.email_address || "";
    const name = first_name + " " + (last_name || "");

    if (!email) throw new Error("Email missing from Clerk user event");

    const user = await User.create({
      _id: id, // optionally use Clerk user ID as _id
      name,
      email,
      image: profile_image_url,
    });

    console.log("✅ User created in MongoDB:", user);
    return user;
  }
);
