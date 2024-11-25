"use client"
import NavigationHeader from "@/components/ui/NavigationHeader";
import { UploadDialog } from "@/components/Upload"
export default function Home() {
    return (
        <div>
            <div>
                <NavigationHeader />
            </div>
            <UploadDialog/>
        </div>
    );
}

