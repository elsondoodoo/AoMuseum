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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import UploadAndHashImage from "@/components/UploadAndHashImage";

export function UploadDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex justify-center mt-5">
          <Button variant="secondary"> Upload </Button>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Upload Your Photo</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&aposre done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">
              Location
            </Label>
            <Input className="col-span-3" />
          </div>
           <UploadAndHashImage/>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
