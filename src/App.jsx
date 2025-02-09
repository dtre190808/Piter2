import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AttractionPage from './pages/AttractionPage';
import NotFoundPage from './pages/NotFoundPage';
import VisitPage from './pages/VisitPage';
import { HashRouter } from 'react-router-dom';

function App() {
  return (
    
      <Routes>
      <Route path="/" element={<VisitPage />} />
        <Route path="/HomePage" element={<HomePage />} />
        <Route path="/attraction/:slug" element={<AttractionPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    
  );
}

export default App;