"use client";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useUser } from "@clerk/nextjs";
import toast from "react-hot-toast";

const formSchema = z.object({
  cardNumber: z.string().min(16, {
    message: "Card number must be at least 16 digits.",
  }).max(19, {
    message: "Card number cannot exceed 19 digits."
  }).regex(/^\d+$/, {
    message: "Card number must contain only digits."
  }),
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, {
    message: "Expiry date must be in MM/YY format."
  }),
  cvv: z.coerce.number().min(100, {
    message: "CVV must be at least 3 digits."
  }).max(9999, {
    message: "CVV cannot exceed 4 digits."
  })
})

interface AddCardProps {
  onCardAdded: (card: { cardNo: string, expiry: string, cvv: number }) => void;
}

export function AddCard({ onCardAdded }: AddCardProps) {
  const user = useUser()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cardNumber: "",
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    if(user.user) {
      try {
        const response = await fetch('/api/add-card', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            cardNumber: values.cardNumber,
            expiryDate: values.expiryDate,
            cvv: values.cvv,
            userId: user.user.id,
          }),
        });

        if (response.ok) {
          toast.success("Card Added");
          onCardAdded({ cardNo: values.cardNumber, expiry: values.expiryDate, cvv: values.cvv });
          form.reset()
        } else {
          toast.error("Failed to add card");
        }
      } catch (error) {
        toast.error("Failed to add card");
      }
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Card</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="cardNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Card Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your card number" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your card number
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="expiryDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expiry date</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter card expiry date" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your card expiry date
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cvv"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Card CVV</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter CVV" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your card cvv
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit">Submit</Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
      </CardFooter>
    </Card>
  )
}