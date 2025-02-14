'use client';
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import toast from "react-hot-toast";

interface UserCard {
  cardNo: string;
  expiry: string;
  cvv: number;
}

interface YourCardsProps {
  cards: UserCard[];
}

export function YourCards({ cards: initialCards }: YourCardsProps) {
  const { user } = useUser();
  const [cards, setCards] = useState<UserCard[]>(initialCards);

  useEffect(() => {
    async function fetchCards() {
      if (user) {
        try {
          const response = await fetch(`/api/get-cards?userId=${user.id}`);
          if (response.ok) {
            const data = await response.json();
            setCards(data.cards);
          } else {
            toast.error("Failed to fetch cards");
          }
        } catch (error) {
          toast.error("Failed to fetch cards");
        }
      }
    }

    fetchCards();
  }, [user]);

  return (
    <div className="space-y-4">
      {cards.map((card, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center space-x-4 pb-2">
            <CreditCard className="h-6 w-6 text-primary" />
            <CardTitle className="text-lg">
              {card.cardNo}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Expires: {card.expiry}</p>
            <p className="text-sm text-muted-foreground">CVV: {card.cvv}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

