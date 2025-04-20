import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SplashPage from './Pages/SplashPage'
import LoadingPage from './Pages/LoadingPage'
import ReportPage from './Pages/ReportPage'
import AuthScreen from './AuthScreen'
import AboutUsPage from './Pages/AboutUsPage'
import MainLayout from './Layouts/MainLayout'
// Add TechnicalPage and AboutUsPage if you have them

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<SplashPage />} />
          <Route path="/loading" element={<LoadingPage />} />
          <Route path="/report" element={<ReportPage />} />
          <Route path="/auth" element={<AuthScreen />} />
          <Route path="/about" element={<AboutUsPage />} />
        </Route>
        {/* Example:
        <Route path="/about" element={<AboutUsPage />} /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
