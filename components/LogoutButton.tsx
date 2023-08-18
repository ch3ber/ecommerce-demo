import { Button } from "@nextui-org/button";

export default function LogoutButton() {
  return (
    <form action="/auth/sign-out" method="post">
      <Button color="secondary" variant="ghost" type="submit">
        Log Out
      </Button>
    </form>
  )
}
