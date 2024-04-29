"use client";
import LayoutCreatorCenter from "@/component/LayoutCreatorCenter";
import { UploadContextProvider } from "./uploadContext";
import UploadVideo from "@/component/UploadVideo/page";

function UploadCreator() {

  return (
    <LayoutCreatorCenter>
      <UploadContextProvider >
        <UploadVideo />
      </UploadContextProvider>
    </LayoutCreatorCenter>
  );
}

export default UploadCreator;
