
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './Components/Footer';
import NavBar from './Components/Routes';
import * as Pages from './Pages';


const App=()=> {
  return (

    <div className="App">
      <NavBar />
      <Footer />
      <Routes>
        <Route path="/" element={<Pages.Home />} />
        <Route path="/about" element={<Pages.About />} />
        <Route path="/quiz" element={<Pages.Quiz />} />
        <Route path="/leaderboard" element={<Pages.LeaderBoard />} />
      </Routes>
    </div>
  );

}

export default App;
