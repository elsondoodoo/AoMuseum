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

export function UploadDialog() {


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
           <UploadAndHashImage/>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
