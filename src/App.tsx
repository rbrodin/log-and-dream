import { Routes, Route, Navigate } from 'react-router-dom'
import BottomTabBar from './components/layout/BottomTabBar'
import HomePage from './pages/HomePage'
import SeasonsPage from './pages/SeasonsPage'
import TimelinePage from './pages/TimelinePage'
import SettingsPage from './pages/SettingsPage'

export default function App() {
  return (
    <div style={{ minHeight: '100dvh', backgroundColor: '#ffffff', color: '#111827' }}>
      <main style={{ paddingBottom: '72px' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/seasons" element={<SeasonsPage />} />
          <Route path="/timeline" element={<TimelinePage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <BottomTabBar />
    </div>
  )
}
