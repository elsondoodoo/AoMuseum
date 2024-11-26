import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const UploadAndHashImage = ( { onImageConverted }) => {
  const [selectedImage, setSelectedImage] = useState(null);
//   const [base64String, setBase64String] = useState(null);

  // Function to convert file to base64
  const convertToBase64 = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result;
    //   setBase64String(base64);
      onImageConverted(base64);
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
            //   setBase64String(null);
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
            // console.log(base64String);
          }
        }}
      />
    </div>
  );
};

export default UploadAndHashImage;
