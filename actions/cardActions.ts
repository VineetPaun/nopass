import { clerkClient } from "@clerk/nextjs/server";

interface Card {
  cardNo: string;
  expiry: string;
  cvv: number;
}

export async function addCardServer(
  cardNo: string,
  expiry: string,
  cvv: number,
  userId: string
) {
  // console.log("addCardServer called with:", { cardNo, expiry, cvv, userId });
  const client = await clerkClient();
  const user = await client.users.getUser(userId);
  // console.log("User fetched:", user);

  let cards: Card[] = Array.isArray(user.privateMetadata.cards) ? user.privateMetadata.cards : [];
  // console.log("Existing cards:", cards);

  cards.push({ cardNo, expiry, cvv });
  // console.log("Updated cards:", cards);

  await client.users.updateUserMetadata(userId, {
    privateMetadata: {
      cards: cards
    },
  });
  // console.log("User metadata updated");
}