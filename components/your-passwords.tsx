import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Lock } from "lucide-react"
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import toast from "react-hot-toast";

interface UserPassword {
  websiteName: string;
  password: string;
  confirmPassword: string;
}

interface YourPasswordsProps {
  passwords: UserPassword[];
}

export function YourPasswords({ passwords: initialPassword }: YourPasswordsProps) {

  const { user } = useUser();
  const [passwords, setPasswords] = useState<UserPassword[]>(initialPassword);

  useEffect(() => {
    async function fetchPasswords() {
      if (user) {
        try {
          const response = await fetch(`/api/get-passwords?userId=${user.id}`);
          if (response.ok) {
            const data = await response.json();
            setPasswords(data.passwords);
          } else {
            toast.error("Failed to fetch passwords");
          }
        } catch (error) {
          toast.error("Failed to fetch passwords");
        }
      }
    }

    fetchPasswords();
  }, [user]);

  return (
    <div className="space-y-4">
      {!passwords || passwords.length === 0 ? (
        <Card>
          <CardContent className="py-4">
            <p className="text-center text-muted-foreground">
              No passwords stored yet.
            </p>
          </CardContent>
        </Card>
      ) : (
        passwords.map((password, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center space-x-4 pb-2">
              <Lock className="h-6 w-6 text-primary" />
              <CardTitle className="text-lg">
                {password.websiteName}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Password: {password.password}</p>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  )
}