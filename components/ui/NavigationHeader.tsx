"use client";
import React from "react";
import Link from "next/link";
import { ModeToggle } from "@/components/theme-toggle";
import { BiSolidMapPin } from "react-icons/bi";
import { ArweaveWalletKit, ConnectButton } from "arweave-wallet-kit";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";

const NavigationHeader: React.FC = () => {
  return (
    <ArweaveWalletKit
      config={{
        permissions: ["ACCESS_ADDRESS", "SIGN_TRANSACTION"],
        ensurePermissions: true,
      }}
    >
      <header className="w-full bg-background border-b border-border">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2 group transition-transform duration-500 hover:scale-105">
            {/* Map pin with synchronized hover effect */}
            <BiSolidMapPin className="text-2xl transition-colors duration-500 group-hover:text-orange-500" />
            <Link
              href="/"
              className="text-xl font-bold transition-colors duration-500 group-hover:text-orange-500"
            >
              AoMuseum
            </Link>
          </div>
          <ul className="flex space-x-4 items-center">
            {/* Dropdown menu with NavigationMenu */}
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="hover:bg-gray-100 px-4 py-2 rounded-md">
                    Explore Museums
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="bg-white border border-gray-200 rounded-md shadow-lg">
                    <ul className="p-2 space-y-2">
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            href="/Getty"
                            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded whitespace-nowrap"
                          >
                            Getty Villa
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            href="/Louvre"
                            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded whitespace-nowrap"
                          >
                            Louvre Museum
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            href="/Beijing"
                            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded whitespace-nowrap"
                          >
                            National Museum of China
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <ConnectButton className="ml-4" />
            <li>
              <ModeToggle />
            </li>
          </ul>
        </nav>
      </header>
    </ArweaveWalletKit>
  );
};

export default NavigationHeader;
