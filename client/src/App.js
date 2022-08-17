import { Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './Components/Footer';
import RoutesBar from './Components/RoutesBar';
import * as Pages from './Pages';

const App = () => {
  return (
    <div className="App">
      <RoutesBar />
      <Routes>
        <Route path="/" element={<Pages.Home />} />
        <Route path="/about" element={<Pages.About />} />
        <Route path="/quiz" element={<Pages.Quiz />} />
        <Route path="/leaderboard" element={<Pages.LeaderBoard />} />
        <Route path="/quiz-categories" element={<Pages.QuizCategories />} />
        <Route path="/rooms/:roomId" element={<Pages.QuizRoom />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
