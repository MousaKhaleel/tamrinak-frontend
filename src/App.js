import './App.css';
import Homepage from './components/homepage/Homepage'
import Footer from './components/footer/Footer';
import NavigationBar from './components/navigationBar/NavigationBar'
import { UserProvider } from './context/UserContext';
import { ThemeProvider } from './context/ThemeContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AboutUs from './components/aboutUs/AboutUs';
import Login from './components/auth/login/Login';
import Register from './components/auth/register/Register';

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
