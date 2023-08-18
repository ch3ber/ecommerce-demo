import { Button } from "@nextui-org/button";

export default function LogoutButton() {
  return (
    <form action="/auth/sign-out" method="post">
      <Button type="submit">
        Logout
      </Button>
    </form>
  )
}
