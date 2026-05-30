import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import DashboardLayout from './components/layout/DashboardLayout';
import DashboardPage from './pages/Dashboard';

function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/dashboard" element={<DashboardLayout />}> 
          <Route index element={<DashboardPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
