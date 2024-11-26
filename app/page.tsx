"use client"

import NavigationHeader from "@/components/ui/NavigationHeader";
import Map from "@/components/map";
// import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <div>
        <NavigationHeader />
      </div>
      
      <div className="flex justify-center ml-10 mr-10">
        <div className="w-full p-10">
          <Map />
        </div>
      </div>
      
    </div>
  );
}
