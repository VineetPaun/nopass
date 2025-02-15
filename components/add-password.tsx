"use client";
import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
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
import { useUser } from "@clerk/nextjs";
import toast from "react-hot-toast";

const formSchema = z.object({
  websiteName: z.string(),
  password: z.string(),
  confirmPassword: z.string()
})

interface AddPasswordProps {
  onPasswordAdded: (passwords: { websiteName: string, password: string, confirmPassword: string }) => void;
}

export function AddPassword({ onPasswordAdded }: AddPasswordProps) {
  const user = useUser()

  const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        websiteName: "",
        password: "",
        confirmPassword: ""
    },
  })

  const { formState: { isSubmitting } } = form;
  const [isProcessing, setIsProcessing] = useState(false);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (isProcessing) return; // Prevent duplicate processing
    setIsProcessing(true);
    
    if(user.user) {
      try {
        const response = await fetch('/api/add-password', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            websiteName: values.websiteName,
            password: values.password,
            confirmPassword: values.confirmPassword,
            userId: user.user.id,
          }),
        });

        if (response.ok) {
          toast.success("Password Added");
          onPasswordAdded({ websiteName: values.websiteName, password: values.password, confirmPassword: values.confirmPassword });
          form.reset();
          setIsProcessing(false);
          return; // Add return statement here
        }
        
        toast.error("Failed to add password");
        setIsProcessing(false);
        return;
      } catch (error) {
        toast.error("Failed to add password");
        setIsProcessing(false);
        return;
      }
    }
    setIsProcessing(false);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Password</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="websiteName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Website Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your website name" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your website name
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password:</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter card password" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your password
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm password</FormLabel>
                  <FormControl>
                    <Input placeholder="Confirm password" {...field} />
                  </FormControl>
                  <FormDescription>
                    Confirm the password
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit" disabled={isSubmitting || isProcessing}>Submit</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}