"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import UploadAndHashImage from "@/components/UploadAndHashImage";
import { useState } from "react";
import { message, createDataItemSigner, result } from "@permaweb/aoconnect";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";

const process_address = "UgfK0rO3yZIPv9z-Ni3Wr3TMpV9ghkOMK0nTZJ_EQsc";

export function UploadDialog({ location }) {
  const { toast } = useToast();
  const [base64Image, setBase64Image] = useState(null);

  const handleImageConverted = (base64String) => {
    setBase64Image(base64String);
    console.log("Base64 in Upload:", base64String);
  };

  async function mint() {
    const timestamp = Math.floor(new Date().getTime() / 1000);
    const response = await message({
      process: process_address,
      tags: [
        { name: "Action", value: "Mint" },
        { name: "Timestamp", value: timestamp.toString() },
        { name: "Image_base64", value: "" },
        { name: "Location", value: location },
      ],
      signer: createDataItemSigner(window.arweaveWallet),
      data: base64Image,
    });
    const r = await result({
      message: response,
      process: process_address,
    });
    console.log(JSON.stringify(r.Messages));
  }

  async function getNFTCount() {
    const response = await message({
      process: process_address,
      tags: [{ name: "Action", value: "GetNFTCount" }],
      signer: createDataItemSigner(window.arweaveWallet),
    });
    const r = await result({
      message: response,
      process: process_address,
    });
    const count = Number(r.Messages[0].Data.slice(13));
    console.log(count);
    return count;
  }

  async function mintAndToast(s) {
    await mint(s);
    const count = await getNFTCount();
    toast({
      title: "Image Added",
      description: `Image ID ${count}`,
      action: (
        <a
          href={`https://www.ao.link/#/entity/${process_address}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <ToastAction altText="Try again">View Transaction</ToastAction>
        </a>
      ),
    });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex justify-center">
          <Button variant="secondary" className="hover:bg-orange-100">
            {" "}
            Upload{" "}
          </Button>
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
          <UploadAndHashImage onImageConverted={handleImageConverted} />
        </div>
        <DialogFooter>
          <Button onClick={() => mintAndToast(base64Image)}>Mint</Button>
          {/* <Button type="submit">Save changes</Button> */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
