"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { ChangeEvent } from "react";

export default function UploadFile() {
  const supabase = createClientComponentClient();

  // Handle file upload event
  const uploadFile = async (
    event: ChangeEvent & { target: HTMLInputElement }
  ) => {
    if (event.target.files && event.target.files?.length) {
      const file = event.target?.files[0];
      console.log("olha aí", file);
      const bucket = "brock/imoveis";

      // Call Storage API to upload file
      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(file.name, file);

      // Handle error if upload failed
      if (error) {
        console.log(error);
        alert("Error uploading file.");
        return;
      }
    }

    alert("File uploaded successfully!");
  };

  return (
    <div>
      <h1>Upload Profile Photo</h1>
      <input type="file" onChange={uploadFile} />
    </div>
  );
}
