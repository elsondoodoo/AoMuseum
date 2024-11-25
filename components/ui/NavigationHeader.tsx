"use client";
import React from 'react';
import Link from 'next/link';
import { ModeToggle } from "@/components/theme-toggle";
import { BiSolidMapPin } from "react-icons/bi";
import { ArweaveWalletKit, ConnectButton } from 'arweave-wallet-kit';

const NavigationHeader: React.FC = () => {
    return (
        <ArweaveWalletKit config={{
            permissions: ["ACCESS_ADDRESS", "SIGN_TRANSACTION"],
            ensurePermissions: true
        }}>
            <header className="w-full bg-background border-b border-border">
                <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <div className="flex items-center space-x-2 group transition-transform duration-500 hover:scale-105">
                        {/* Map pin with synchronized hover effect */}
                        <BiSolidMapPin className="text-2xl transition-colors duration-500 group-hover:text-orange-500" />
                        <Link
                            href="/"
                            className="text-xl font-bold transition-colors duration-500 group-hover:text-orange-500">
                            AoMuseum
                        </Link>
                    </div>
                    <ul className="flex space-x-4 items-center">
                        <ConnectButton className='ml-4' />
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
