"use client"

import NavigationHeader from "@/components/ui/NavigationHeader";
import Map from "@/components/map";
import UploadAndHashImage from "@/components/UploadAndHashImage"

export default function Home() {
  return (
    <div>
      <div>
        <NavigationHeader />
      </div>

      <div className="flex justify-center mt-10">
        <div style={{ width: '66.67%' }}>
          <Map />
        </div>
      </div>
      <div>
				<UploadAndHashImage /> 
			</div>
    </div>
  );
}
