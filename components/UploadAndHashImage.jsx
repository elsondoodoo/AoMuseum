import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
//import { message, createDataItemSigner, result } from "@permaweb/aoconnect";

const process_address = "UgfK0rO3yZIPv9z-Ni3Wr3TMpV9ghkOMK0nTZJ_EQsc";

const UploadAndHashImage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [base64String, setBase64String] = useState(null);
  const [NFTCount, setNFTCount] = useState(0);

  async function getNFTCount() {
    const response = await message({
      process: process_address,
      tags: [{ name: "Action", value: "GetNFTCount" }],
      signer: createDataItemSigner(window.arweaveWallet),
      data: userMessage,
    });
    const r = await result({
      message: response,
      process: process_address,
    });
    setNFTCount(Number(r.Messages[0].Data));
  }

  // Function to convert file to base64
  const convertToBase64 = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result;
      setBase64String(base64);
      console.log("Base64:", base64);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="mt-5 flex flex-col items-center justify-center gap-4">
      {selectedImage && (
        <div className="flex flex-col items-center">
          <Image
            alt="not found"
            width={250}
            height={250}
            src={URL.createObjectURL(selectedImage)}
          />
          <Button
            className="mt-4"
            onClick={() => {
              setSelectedImage(null);
              setBase64String(null);
            }}
          >
            Remove
          </Button>
        </div>
      )}

      <Input
        type="file"
        name="myImage"
        className="max-w-[250px]"
        onChange={(event) => {
          const file = event.target.files[0];
          if (file) {
            setSelectedImage(file);
            convertToBase64(file);
            console.log(base64String);
          }
        }}
      />
    </div>
  );
};

export default UploadAndHashImage;
