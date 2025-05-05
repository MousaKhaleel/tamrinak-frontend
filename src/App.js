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

import 'bootstrap/dist/css/bootstrap.min.css';

import 'bootstrap-icons/font/bootstrap-icons.css';

import SportsPage from './Components/Sport/SportsPage';
import FacilitiesPage from './Components/Facility/FacilitiesPage';
import Profile from './Components/User/Profile';
import AdminDashboard from './Components/Admin/AdminDashboard';
import FieldsPage from './Components/Field/FieldsPage';


function App() {
  return (
    <div className="App">
        <ThemeProvider>
          <BrowserRouter>
          {/* <NavigationBar /> */}
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/sports" element={<SportsPage />} />
              <Route path="/fields" element={<FieldsPage />} />
              {/* <Route path="/facilities/:sportId" element={<FacilityDETAILS />} /> */}
              <Route path="/facilities" element={<FacilitiesPage />} />
              <Route path="//profile" element={<Profile />} />
              <Route path='/adminDashboard' element={<AdminDashboard />} />
              <Route path="/aboutUs" element={<AboutUs />} />
            </Routes>
          </BrowserRouter>
          {/* <Footer /> */}
        </ThemeProvider>
    </div>
  );
}

export default App;
