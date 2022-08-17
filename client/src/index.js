import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App';
<<<<<<< HEAD
import { BrowserRouter as Router } from 'react-router-dom';
=======
import 'bootstrap/dist/css/bootstrap.min.css';

>>>>>>> 0d00b3962d996155fa6a1aaf5c68f8b4423f5719
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<<<<<<< HEAD
  <Router>
     <App />
  </Router>
    
  
=======
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
>>>>>>> 0d00b3962d996155fa6a1aaf5c68f8b4423f5719
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
