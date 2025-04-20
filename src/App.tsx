import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SplashPage from './Pages/SplashPage'
import LoadingPage from './Pages/LoadingPage'
import ReportPage from './Pages/ReportPage'
import AuthScreen from './Pages/AuthScreen'
import AboutUsPage from './Pages/AboutUsPage'
import MainLayout from './Layouts/MainLayout'
import ReportLayout from './Layouts/ReportLayout'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<SplashPage />} />
          <Route path="/loading" element={<LoadingPage />} />
          <Route path="/auth" element={<AuthScreen />} />
          <Route path="/about" element={<AboutUsPage />} />
        </Route>

        <Route element={<ReportLayout />}>
          <Route path="/report" element={<ReportPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
