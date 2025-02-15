import { NextApiRequest, NextApiResponse } from 'next';
import { addPasswordServer } from '@/actions/passwordActions';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { websiteName, password, confirmPassword, userId } = req.body;
    // console.log("API called with:", { cardNumber, expiryDate, cvv, userId });
    try {
      await addPasswordServer(websiteName, password, confirmPassword, userId);
      res.status(200).json({ message: 'Password added successfully' });
    } catch (error) {
    //   console.error("Error adding card:", error);
      res.status(500).json({ error: 'Failed to add password' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}