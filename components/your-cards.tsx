import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CreditCard } from "lucide-react"

export function YourCards() {
  // This is dummy data. In a real application, you would fetch this from your backend.
  const cards = [
    { id: 1, last4: "1234", brand: "Visa", expiry: "12/24" },
    { id: 2, last4: "5678", brand: "Mastercard", expiry: "06/25" },
  ]

  return (
    <div className="space-y-4">
      {cards.map((card) => (
        <Card key={card.id}>
          <CardHeader className="flex flex-row items-center space-x-4 pb-2">
            <CreditCard className="h-6 w-6 text-primary" />
            <CardTitle className="text-lg">
              {card.brand} •••• {card.last4}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Expires: {card.expiry}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

