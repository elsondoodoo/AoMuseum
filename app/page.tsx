"use client"

import NavigationHeader from "@/components/ui/NavigationHeader";
import Map from "@/components/map";
import { UploadDialog } from "@/components/Upload"
import Link from 'next/link';
import { ArweaveWalletKit } from "arweave-wallet-kit";

export default function Home() {
    return (
        <div>
            <ArweaveWalletKit config={{
                permissions: ["ACCESS_ADDRESS", "SIGN_TRANSACTION"],
                ensurePermissions: true
            }}>
                <div>
                    <NavigationHeader />
                </div>

                <div className="flex justify-center ml-10 mr-10">
                    <div className="w-full p-10">
                        <Map />
                    </div>
                </div>
                <div className="flex justify-center ml-10 mr-10 mb-10">
                    <UploadDialog />
                </div>
            </ArweaveWalletKit>
        </div>
    );
}
