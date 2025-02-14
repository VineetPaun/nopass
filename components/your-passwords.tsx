import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Lock } from "lucide-react"

export function YourPasswords() {
  // This is dummy data. In a real application, you would fetch this from your backend.
  const passwords = [
    { id: 1, website: "example.com", username: "johndoe" },
    { id: 2, website: "anothersite.com", username: "janedoe" },
  ]

  return (
    <div className="space-y-4">
      {passwords.map((password) => (
        <Card key={password.id}>
          <CardHeader className="flex flex-row items-center space-x-4 pb-2">
            <Lock className="h-6 w-6 text-primary" />
            <CardTitle className="text-lg">{password.website}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Username: {password.username}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

