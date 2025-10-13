import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';

// Page view imports

import App from './App';
import About from './components/About';
import MyLessons from './components/MyLessons';
import PrivacyPolicy from './components/PrivacyPolicy';
import LessonDetail from './components/LessonDetail';
import EditLesson from './components/EditLesson';




createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="about" element={<About />} />
      <Route path="my-lessons" element={<MyLessons />} />
      <Route path="lessons/:id" element={<LessonDetail />} />
      <Route path="lessons/:id/edit" element={<EditLesson />} />
      <Route path="privacy-policy" element={<PrivacyPolicy />} />
    </Routes>
  </BrowserRouter>,
);
