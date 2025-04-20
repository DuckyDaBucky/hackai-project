import { useRef } from "react";
import { FiUpload } from "react-icons/fi";
import { useStore } from "../Data/store";

type Props = {
  onUpload: (file: File) => void;
};

export default function PDFUpload({ onUpload }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const setPdfFile = useStore((state) => state.setPdfFile);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      setPdfFile(file);
      onUpload(file);
    }
  };

  const handleSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setPdfFile(file);
      onUpload(file);

      // Send file to API
      const formData = new FormData();
      formData.append("file", file);
      fetch("http://127.0.0.1:8000/upload", {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Upload failed with status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          console.log("Upload successful:", data);
        })
        .catch((error) => {
          console.error("Error uploading file:", error);
        });
    }
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      className="mx-auto max-w-xl border-2 border-dashed border-gray-300 rounded-2xl bg-white/50 backdrop-blur-md shadow-md p-8 cursor-pointer transition hover:scale-105 hover:shadow-lg hover:border-plum"
      onClick={() => fileInputRef.current?.click()}
    >
      <div className="flex flex-col items-center space-y-4 text-graySlate font-body">
        <FiUpload size={48} className="text-graySlate" />
        <h2 className="text-lg font-semibold">Upload your annual report</h2>
        <p className="text-sm text-gray-500">
          Click to upload or drag and drop a PDF
        </p>
      </div>
      <input
        type="file"
        accept="application/pdf"
        ref={fileInputRef}
        onChange={handleSelectFile}
        className="hidden"
      />
    </div>
  );
}
