import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Quiz from './Pages/Quiz';
import QuizRoom from './Pages/QuizRoom';
import Home from './Pages/Home';

function App() {
  return (
    <Routes path="/">
      <Route path="/" element={<Home />} />
      <Route path="/quiz" element={<Quiz />} />
      <Route path="/rooms/:roomId" element={<QuizRoom />} />

    </Routes>
    
  );
}

export default App;
