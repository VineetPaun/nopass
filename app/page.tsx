'use client';
import { useState } from "react";
import { AddCard } from "@/components/add-card";
import { AddPassword } from "@/components/add-password";
import { YourCards } from "@/components/your-cards";
import { YourPasswords } from "@/components/your-passwords";

interface UserCard {
  cardNo: string;
  expiry: string;
  cvv: number;
}

export default function Home() {
  const [cards, setCards] = useState<UserCard[]>([]);

  const handleCardAdded = (newCard: UserCard) => {
    setCards((prevCards) => [...prevCards, newCard]);
  };

  return (
    <div className="container mx-auto p-4 space-y-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h1 className="text-2xl font-bold text-primary">Add a Credit Card</h1>
          <AddCard onCardAdded={handleCardAdded} />
        </div>
        <div className="space-y-4">
          <h1 className="text-2xl font-bold text-primary">Add a Password</h1>
          <AddPassword />
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h1 className="text-2xl font-bold text-primary">Your Cards</h1>
          <YourCards cards={cards} />
        </div>
        <div className="space-y-4">
          <h1 className="text-2xl font-bold text-primary">Your Passwords</h1>
          <YourPasswords />
        </div>
      </div>
    </div>
  );
}

