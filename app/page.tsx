"use client"

import NavigationHeader from "@/components/ui/NavigationHeader";
import Map from "@/components/map";


export default function Home() {
  return (
    <div>
      <div>
        <NavigationHeader />
      </div>

      <div className="flex justify-center">
        <Map />
      </div>
    </div>
  );
}
