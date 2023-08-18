'use client'

import { Button } from "@nextui-org/button"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

export default function LoginButton() {
  const supabase = createClientComponentClient()

  const login = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          scopes: 'https://www.googleapis.com/auth/calendar',
        }
      })

      if (error) {
        console.log(error)
      }
    } catch (e) {
      console.log(e)
    }

  }

  return <Button onClick={() => login()}>Sign In with Google</Button>
}
