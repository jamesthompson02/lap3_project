import { Route, Routes } from 'react-router-dom';
import './App.css';
<<<<<<< HEAD
import { Route, Routes } from 'react-router-dom';
import Quiz from './Pages/Quiz';
import QuizRoom from './Pages/QuizRoom';
import Home from './Pages/Home';
=======
import Footer from './Components/Footer';
import RoutesBar from './Components/RoutesBar';
import * as Pages from './Pages';
>>>>>>> 0d00b3962d996155fa6a1aaf5c68f8b4423f5719

const App = () => {
  return (
<<<<<<< HEAD
    <Routes path="/">
      <Route path="/" element={<Home />} />
      <Route path="/quiz" element={<Quiz />} />
      <Route path="/rooms/:roomId" element={<QuizRoom />} />

    </Routes>
    
=======
    <div className="App">
      <RoutesBar />
      <Footer />
      <Routes>
        <Route path="/" element={<Pages.Home />} />
        <Route path="/about" element={<Pages.About />} />
        <Route path="/quiz" element={<Pages.Quiz />} />
        <Route path="/leaderboard" element={<Pages.LeaderBoard />} />
      </Routes>
    </div>
>>>>>>> 0d00b3962d996155fa6a1aaf5c68f8b4423f5719
  );
};

export default App;
