import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './i18n';
import HomePage from './pages/HomePage.tsx';
import SecondPage from './second/SecondPage.tsx';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/second" element={<SecondPage />} />
      </Routes>
    </BrowserRouter>
  );
}
