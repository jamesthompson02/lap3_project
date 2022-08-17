import { Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './Components/Footer';
import RoutesBar from './Components/RoutesBar';
import * as Pages from './Pages';

const App = () => {
  return (
    <div className="App">
      <RoutesBar />
      <Footer />
      <Routes>
        <Route path="/" element={<Pages.Home />} />
        <Route path="/about" element={<Pages.About />} />
        <Route path="/quiz" element={<Pages.Quiz />} />
        <Route path="/leaderboard" element={<Pages.LeaderBoard />} />
        <Route path="/rooms/:roomId" element={<Pages.QuizRoom />} />
      </Routes>
    </div>
  );
};

export default App;
