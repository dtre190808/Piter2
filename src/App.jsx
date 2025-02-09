import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AttractionPage from './pages/AttractionPage';
import NotFoundPage from './pages/NotFoundPage';
import VisitPage from './pages/VisitPage';

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<VisitPage />} />
        <Route path="/HomePage" element={<HomePage />} />
        <Route path="/attraction/:slug" element={<AttractionPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;