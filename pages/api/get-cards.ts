import { NextApiRequest, NextApiResponse } from 'next';
import { clerkClient } from "@clerk/nextjs/server";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { userId } = req.query;
    try {
      const client = await clerkClient();
      const user = await client.users.getUser(userId as string);
      const cards = user.privateMetadata.cards || [];
      res.status(200).json({ cards });
    } catch (error) {
      console.error("Error fetching cards:", error);
      res.status(500).json({ error: 'Failed to fetch cards' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}