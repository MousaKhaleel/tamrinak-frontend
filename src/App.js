import './App.css';
import Homepage from './Components/Homepage/Homepage'
import Footer from './Components/Footer/Footer';
import NavigationBar from './Components/NavigationBar/NavigationBar'
import { UserProvider } from './Context/UserContext';
import { ThemeProvider } from './Context/ThemeContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AboutUs from './Components/AboutUs/AboutUs';
import Login from './Components/Auth/Login/Login';
import Register from './Components/Auth/Register/Register';

// import 'bootstrap/dist/css/bootstrap.min.css'; 
// import $ from 'jquery'; 
// import Popper from 'popper.js'; 
// import 'bootstrap/dist/js/bootstrap.bundle.min';


function App() {
  return (
    <div className="App">
      <UserProvider>
        <ThemeProvider>


          
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Homepage />} />
              {/* <Route path="/" element={< />} /> */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/aboutUs" element={<AboutUs />} />
            </Routes>
          </BrowserRouter>
          {/* <Footer /> */}
        </ThemeProvider>
      </UserProvider>
    </div>
  );
}

export default App;
