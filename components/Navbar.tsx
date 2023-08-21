'use client'
import { User as UserI, createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import { useEffect, useState } from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, User } from "@nextui-org/react";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";

export default function NavbarComponent() {
  const supabase = createClientComponentClient()
  const [user, setUser] = useState<UserI | null>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const {
        data,
      } = await supabase.auth.getUser()

      setUser(data.user)
    }

    getUser()
  }, [supabase])


  const menuItems = [
    {
      name: 'Home',
      href: '/',
    },
    {
      name: 'Agendar cita',
      href: '/calendar',
    },
    {
      name: 'Comprar Productos',
      href: '/products',
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
          {user &&
            <User
              name={user.user_metadata.name}
              description={user.email}
              avatarProps={{
                src: user.user_metadata.picture
              }}
            />
          }

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
