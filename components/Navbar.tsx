'use client'
import { User, createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import { useEffect, useState } from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, NavbarMenuToggle, NavbarMenu, NavbarMenuItem } from "@nextui-org/react";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";

export default function NavbarComponent() {
  const supabase = createClientComponentClient()
  const [user, setUser] = useState<User | null>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const {
        data,
      } = await supabase.auth.getUser()

      setUser(data.user)
    }

    getUser()
  }, [user, supabase])


  const menuItems = [
    {
      name: 'Home',
      href: '/',
    },
    {
      name: 'Calendar',
      href: '/calendar',
    },
    {
      name: 'Payments',
      href: '/payments',
    },
  ];

  return (
    <Navbar isBordered onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <p className="font-bold text-inherit">Demo</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                index === 0 ? "primary" : "foreground"
              }
              href={item.href}
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          {user && <span className="font-bold">{user.email}</span>}
        </NavbarItem>
        <NavbarItem className="hidden lg:flex">
          {
            user
              ? <LogoutButton />
              : <LoginButton />
          }
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                index === 0 ? "primary" : "foreground"
              }
              className="w-full"
              href={item.href}
              size="lg"
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
        <NavbarMenuItem>
          {
            user
              ? <LogoutButton />
              : <LoginButton />
          }
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}
