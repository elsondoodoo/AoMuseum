"use client"

import NavigationHeader from "@/components/ui/NavigationHeader";
import Map from "@/components/map";
import { UploadDialog } from "@/components/Upload"

export default function Home() {
  return (
    <div>
      <div>
        <NavigationHeader />
      </div>

      <div className="flex justify-center mt-10">
        <Map />
      </div>
      <div>
        <UploadDialog />
			</div>
    </div>
  );
}
