// // import { Inngest } from "inngest";
// // import User from "../models/User.js";
// // import connectDB from "../configs/db.js";

// // export const inngest = new Inngest({
// //     id: "Movie Ticket Booking", name: "Movie Ticket Booking App",
// //     signingKey: process.env.INNGEST_SIGNING_KEY,
// // });

// // const syncUserCreation = inngest.createFunction(
// //     { id: 'sync-user-rom-clerk' },
// //     { event: 'clerk/user.created' },
// //     async ({ event }) => {
// //         await connectDB();
// //         const { id, first_name, last_name, email_addresses, image_url } = event.data
// //         const userData = {
// //             _id: id,
// //             email: email_addresses[0].email.email_address,
// //             name: first_name + ' ' + last_name,
// //             image: image_url
// //         }
// //         await User.create(userData)
// //     }
// // )

// // const syncUserDeletion = inngest.createFunction(
// //     { id: 'delete-user-with-clerk' },
// //     { event: 'clerk/user.deleted' },
// //     async ({ event }) => {
// //         await connectDB();
// //         const { id } = event.data;
// //         await User.findByIdAndDelete(id);
// //     }
// // );

// // const syncUserUpdation = inngest.createFunction(
// //     { id: 'update-user-from-clerk' },
// //     { event: 'clerk/user.updated' },
// //     async ({ event }) => {
// //         await connectDB();
// //         const { id, first_name, last_name, email_addresses, image_url } = event.data;
// //         const userData = {
// //             _id: id,
// //             email: email_addresses[0].email_address,
// //             name: first_name + ' ' + last_name,
// //             image: image_url
// //         };
// //         await User.findByIdAndUpdate(id, userData);
// //     }
// // );

// // export const functions = [syncUserCreation, syncUserDeletion, syncUserUpdation];
// import { Inngest } from "inngest";
// import User from "../models/User.js";
// import connectDB from "../configs/db.js";

// export const inngest = new Inngest({
//     id: "Movie Ticket Booking",
//     name: "Movie Ticket Booking App",
//     signingKey: process.env.INNGEST_SIGNING_KEY,
// });

// // const syncUserCreation = inngest.createFunction(
// //   { id: "sync-user-rom-clerk" },
// //   { event: "clerk/user.created" },
// //   async ({ event }) => {
// //     await connectDB();
// //     const { id, first_name, last_name, email_addresses, image_url } = event.data;

// //     const userData = {
// //       _id: id,
// //       email: email_addresses[0].email_address, // ✅ fixed
// //       name: `${first_name} ${last_name}`,
// //       image: image_url,
// //     };

// //     await User.create(userData);
// //     console.log("✅ User created:", userData);
// //     console.log("📩 Incoming event:", event.data);
// //     return { status: "user created", user: userData };
// //   }
// // );
// const syncUserCreation = inngest.createFunction(
//     { id: "sync-user-from-clerk" },
//     { event: "clerk/user.created" },
//     async ({ event }) => {
//         const { id, email_addresses, first_name, last_name, image_url } = event.data;

//         const userData = {
//             _id: id,
//             name: `${first_name} ${last_name}`,
//             email: email_addresses[0].email_address,
//             image: image_url,
//         };

//         // ✅ Add logs & DB insert here
//         console.log("📩 Incoming event:", event.data);

//         try {
//             const createdUser = await User.create(userData);
//             console.log("✅ User inserted in Mongo:", createdUser);
//         } catch (err) {
//             console.error("❌ Mongo insert failed:", err.message);
//         }

//         return { success:true,message: "User synced to Mongo" };
//     }
// );

// const syncUserDeletion = inngest.createFunction(
//     { id: "delete-user-with-clerk" },
//     { event: "clerk/user.deleted" },
//     async ({ event }) => {
//         await connectDB();
//         const { id } = event.data;
//         await User.findByIdAndDelete(id);
//         return { status: "user deleted", id };
//     }
// );

// const syncUserUpdation = inngest.createFunction(
//     { id: "update-user-from-clerk" },
//     { event: "clerk/user.updated" },
//     async ({ event }) => {
//         await connectDB();
//         const { id, first_name, last_name, email_addresses, image_url } = event.data;

//         const userData = {
//             email: email_addresses[0].email_address,
//             name: `${first_name} ${last_name}`,
//             image: image_url,
//         };

//         await User.findByIdAndUpdate(id, userData, { upsert: true, new: true }); // ✅ upsert
//         return { status: "user updated", user: userData };
//     }
// );

// export const functions = [syncUserCreation, syncUserDeletion, syncUserUpdation];

// import { Inngest } from "inngest";
// import connectDB from "../configs/db.js";
// import User from "../models/User.js";

// export const inngest = new Inngest({
//   id: "quickshow-app",
//   name: "Quickshow App",
//   signingKey: process.env.INNGEST_SIGNING_KEY,
// });

// export const functions = [

//   // 🟢 CREATE user
//   inngest.createFunction(
//     { id: "clerk-user-created" },
//     { event: "clerk/user.created" },
//     async ({ event }) => {
//       await connectDB();
//       const { id, first_name, last_name, email_addresses, image_url } = event.data;

//       const userData = {
//         _id: id,
//         name: `${first_name || ""} ${last_name || ""}`.trim(),
//         email: email_addresses?.[0]?.email_address || "",
//         image: image_url,
//       };

//       try {
//         const newUser = await User.create(userData);
//         console.log("✅ Clerk user created in Mongo:", newUser);
//         return { success: true, userId: newUser._id };
//       } catch (err) {
//         console.error("❌ Failed to create Clerk user:", err.message);
//         return { success: false, error: err.message };
//       }
//     }
//   ),

//   // 🟡 UPDATE user
//   inngest.createFunction(
//     { id: "clerk-user-updated" },
//     { event: "clerk/user.updated" },
//     async ({ event }) => {
//       await connectDB();
//       const { id, first_name, last_name, email_addresses, image_url } = event.data;

//       const updateData = {
//         name: `${first_name || ""} ${last_name || ""}`.trim(),
//         email: email_addresses?.[0]?.email_address || "",
//         image: image_url,
//       };

//       try {
//         const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true, upsert: true });
//         console.log("🔄 Clerk user updated in Mongo:", updatedUser);
//         return { success: true, userId: updatedUser._id };
//       } catch (err) {
//         console.error("❌ Failed to update Clerk user:", err.message);
//         return { success: false, error: err.message };
//       }
//     }
//   ),

//   // 🔴 DELETE user
//   inngest.createFunction(
//     { id: "clerk-user-deleted" },
//     { event: "clerk/user.deleted" },
//     async ({ event }) => {
//       await connectDB();
//       const { id } = event.data;

//       try {
//         await User.findByIdAndDelete(id);
//         console.log("🗑️ Clerk user deleted:", id);
//         return { success: true, userId: id };
//       } catch (err) {
//         console.error("❌ Failed to delete Clerk user:", err.message);
//         return { success: false, error: err.message };
//       }
//     }
//   ),
// ];
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
