import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import UploadAndHashImage from "@/components/UploadAndHashImage"; 
import { useState } from "react";



export function UploadDialog() {
  const [base64Image, setBase64Image] = useState(null);

  const handleImageConverted = (base64String) => {
    setBase64Image(base64String);
    console.log('Base64 in Upload:', base64String);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex justify-center">
          <Button variant="secondary"> Upload </Button>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Upload Your Photo</DialogTitle>
          <DialogDescription>
            Upload photos of the exhibition.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
           <UploadAndHashImage onImageConverted={handleImageConverted}/>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
