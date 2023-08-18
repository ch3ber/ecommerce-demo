import { cookies } from 'next/headers'

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";

import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";


export default async function NavbarComponent() {
  const supabase = createServerComponentClient({ cookies })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <>
      <Navbar isBordered>
        <NavbarBrand>
          <p className="font-bold text-inherit">E-Commerce Demo</p>
        </NavbarBrand>
        <NavbarContent className="flex gap-4" justify="center">
          <NavbarItem>
            <Link color="foreground" href="/">
              Home
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="/calendar">
              Calendar
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="/payments">
              payments
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem>
            {user && <span className='font-bold'>{user.email}</span>}
          </NavbarItem>
          <NavbarItem className="flex">
            {
              user
                ? <LogoutButton />
                : <LoginButton />
            }
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    </>
  );
}
