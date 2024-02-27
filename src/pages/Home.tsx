import { useState } from "react";
import UploadCsv from "./UploadCsv";
import { UploadFile } from "antd";

function Home() {
  const [uploadedFile, setUploadedFile] = useState<UploadFile | null>(null);
  const [currentStep, setCurrentStep] = useState(0);

  if (currentStep === 0) {
    return (
      <UploadCsv
        onUpload={(file: UploadFile) => {
          setUploadedFile(file);
          setCurrentStep(1);
        }}
      />
    );
  }
  if (currentStep === 1) {
    return (
      <div>
        <h1>Step 2</h1>
        <p>Uploaded file: {uploadedFile?.name}</p>
      </div>
    );
  }
}
export default Home;
