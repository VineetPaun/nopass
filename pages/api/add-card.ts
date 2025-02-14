import { NextApiRequest, NextApiResponse } from 'next';
import { addCardServer } from '@/actions/actions';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { cardNumber, expiryDate, cvv, userId } = req.body;
    console.log("API called with:", { cardNumber, expiryDate, cvv, userId });
    try {
      await addCardServer(cardNumber, expiryDate, cvv, userId);
      res.status(200).json({ message: 'Card added successfully' });
    } catch (error) {
      console.error("Error adding card:", error);
      res.status(500).json({ error: 'Failed to add card' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}