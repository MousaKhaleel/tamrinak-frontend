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

function App() {
  return (
    <div className="App">
      <UserProvider>
        <ThemeProvider>

          <NavigationBar />
          
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Homepage />} />
              {/* <Route path="/" element={< />} /> */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/aboutus" element={<AboutUs />} />
            </Routes>
          </BrowserRouter>
          <Footer />
        </ThemeProvider>
      </UserProvider>
    </div>
  );
}

export default App;
