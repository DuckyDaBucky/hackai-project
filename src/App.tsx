import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SplashPage from './Pages/SplashPage'
import LoadingPage from './Pages/LoadingPage'
import ReportPage from './Pages/ReportPage'
import AuthScreen from './Pages/AuthScreen'
import AboutUsPage from './Pages/AboutUsPage'
import MainLayout from './Layouts/MainLayout'

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
      </Routes>
    </BrowserRouter>
  )
}

export default App
