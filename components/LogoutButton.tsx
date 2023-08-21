'use client'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Button } from "@nextui-org/button";

export default function LogoutButton() {
  const logOut = async () => {
    const supabase = createClientComponentClient()
    await supabase.auth.signOut()
    window.location.reload()
  }

  return (
    <Button color="secondary" variant="ghost" onClick={() => logOut()}>
      Log Out
    </Button>
  )
}
