import { BrowserRouter, Routes, Route } from "react-router-dom";
import SplashPage from "./Pages/SplashPage";
import LoadingPage from "./Pages/LoadingPage";
import ReportPage from "./Pages/ReportPage";
import AuthScreen from "./Pages/AuthScreen";
import AboutUsPage from "./Pages/AboutUsPage";
import MainLayout from "./Layouts/MainLayout";
// Add TechnicalPage and AboutUsPage if you have them

function App() {
  return (
    <BrowserRouter
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <Routes>
          <Route path="/" element={<SplashPage />} />
          <Route path="/loading" element={<LoadingPage />} />
          <Route path="/report" element={<ReportPage />} />
          <Route path="/auth" element={<AuthScreen />} />
          <Route path="/about" element={<AboutUsPage />} />
        {/* Example:
        <Route path="/about" element={<AboutUsPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
