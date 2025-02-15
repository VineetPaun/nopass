import { clerkClient } from "@clerk/nextjs/server";

interface Password {
    websiteName: string;
    password: string;
    confirmPassword: string;
}

export async function addPasswordServer(
    websiteName: string,
    password: string,
    confirmPassword: string,
    userId: string
) {
//   console.log("addCardServer called with:", { cardNo, expiry, cvv, userId });
  const client = await clerkClient();
  const user = await client.users.getUser(userId);
//   console.log("User fetched:", user);

  let passwords: Password[] = Array.isArray(user.privateMetadata.passwords) ? user.privateMetadata.passwords : [];
//   console.log("Existing cards:", cards);

  passwords.push({ websiteName, password, confirmPassword });
//   console.log("Updated cards:", cards);

  await client.users.updateUserMetadata(userId, {
    privateMetadata: {
      passwords: passwords
    },
  });
//   console.log("User metadata updated");
}