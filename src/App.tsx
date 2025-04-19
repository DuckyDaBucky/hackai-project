import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SplashPage from './Pages/SplashPage'
import LoadingPage from './Pages/LoadingPage'
import ReportPage from './Pages/ReportPage' // we’ll build this next

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SplashPage />} />
        <Route path="/loading" element={<LoadingPage />} />
        <Route path="/report" element={<ReportPage />} />  
      </Routes>
    </Router>
  )
}
