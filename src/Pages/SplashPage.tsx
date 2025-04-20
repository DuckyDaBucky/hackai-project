import { useNavigate } from "react-router-dom";
import PDFUpload from "../Components/PDFUpload";
import Header from "../Components/Header";

export default function SplashPage() {
  const navigate = useNavigate();

  const handleFileUpload = (file: File) => {
    console.log("Uploaded PDF:", file);
    navigate("/loading");
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-br from-cloud via-paleLavender to-mintWash animate-gradient">
      {/* Floating Header */}
      <Header />

      {/* Main Content */}
      <main className="pt-28 text-center px-4 font-body text-graySlate flex-grow">
        <h1 className="text-5xl font-heading font-bold mb-4">Alfred.AI</h1>
        <p className="text-lg mb-8">
          Turn your financial report into an interactive experience
        </p>
        <PDFUpload onUpload={handleFileUpload} />
      </main>
    </div>
  );
}
