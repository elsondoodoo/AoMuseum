"use client"
import React from 'react';
import Link from 'next/link';
import { ModeToggle } from "@/components/theme-toggle";

const NavigationHeader: React.FC = () => {
  
  return (
    <header className="w-full bg-background border-b border-border">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
      <Link href="/" className="text-xl font-bold hover:scale-105 hover:text-orange-500 transition-transform transition-colors duration-500">Arweave Museum</Link>

        <ul className="flex space-x-4 items-center">
          <li>
            <ModeToggle />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default NavigationHeader;