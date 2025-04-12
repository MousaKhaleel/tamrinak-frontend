import './App.css';
import Homepage from './Components/Homepage/Homepage'
import Footer from './Components/Footer/Footer';
import NavigationBar from './Components/NavigationBar/NavigationBar'
import { ThemeProvider } from './Context/ThemeContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AboutUs from './Components/AboutUs/AboutUs';

import AuthPage from './Components/Auth/AuthPage';

import 'bootstrap/dist/css/bootstrap.min.css'; 
import $ from 'jquery'; 
import Popper from 'popper.js'; 
import 'bootstrap/dist/js/bootstrap.bundle.min';


function App() {
  return (
    <div className="App">
        <ThemeProvider>
          <BrowserRouter>
          {/* <NavigationBar /> */}
            <Routes>
              <Route path="/" element={<Homepage />} />
              {/* <Route path="/" element={< />} /> */}
              {/* <Route path="/login" element={<AuthPage />} />
              <Route path="/register" element={<AuthPage />} /> */}
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/aboutUs" element={<AboutUs />} />
            </Routes>
          </BrowserRouter>
          {/* <Footer /> */}
        </ThemeProvider>
    </div>
  );
}

export default App;
