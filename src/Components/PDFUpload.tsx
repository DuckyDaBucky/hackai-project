import { useRef } from "react";
import { FiUpload } from "react-icons/fi";
import { useStore } from "../Data/store";
import mockData from "../Data/mockReportData";

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

  const uploadFile = (file: any) => {
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
  };

  const loadSlides = async (file: any) => {
    // Send file to API
    const formData = new FormData();
    formData.append("file", file);
    fetch("http://127.0.0.1:8000/pdf-to-json", {
      method: "POST",
      body: formData,
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(
            `Failed to load slides with status: ${response.status}`
          );
        }
        return (await response.json()).slides;
      })
      .then((data) => {
        console.log("Slides loaded successfully:", data);
        // You might want to store this data in your state
        // For example: useStore.getState().setSlides(data);
      })
      .catch((error) => {
        console.error("Error loading slides:", error);
      });
    return {
      slide: "",
      elements: [],
    };
  };

  const handleSelectFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setPdfFile(file);
      onUpload(file);
      uploadFile(file);

      const slides = await loadSlides(file);

      // Use mockData for development/testing
      // You can add elements to mockData like this:
      console.log({ [slides.slide]: slides.elements });
      const extendedMockData = {
        ...mockData,
        [slides.slide]: slides.elements,
      };

      // Or if mockData is an array:
      // const extendedMockData = [
      //   ...mockData,
      //   { id: mockData.length + 1, title: "New Item", content: "New content" }
      // ];

      // You can then use extendedMockData instead of mockData
      console.log("Using mock data:", extendedMockData);
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
