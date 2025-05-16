import './App.css';
import Homepage from './Components/Homepage/Homepage'
import Footer from './Components/Footer/Footer';
import NavigationBar from './Components/NavigationBar/NavigationBar'
import { ThemeProvider } from './Context/ThemeContext';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
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
import FieldDetails from './Components/Field/FieldDetails';
import AddFieldForm from './Components/Admin/DashboardComponents/AddFieldForm';
import AddFacilityForm from './Components/Admin/DashboardComponents/AddFacilityForm';
import AddSportForm from './Components/Admin/DashboardComponents/AddSportForm';
import ConfirmEmail from './Components/Confirm/ConfirmEmail';
import ForgotPassword from './Components/Auth/ForgotPassword';
import PageNotFound from './Components/Other/PageNotFound';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import ResetPassword from './Components/Auth/ResetPassword';


function App() {

  const location = useLocation();
  const hideNavFooter = ["/auth", "/admin-dashboard"].includes(location.pathname);

  return (
    <div className="App">
        <ThemeProvider>
          {!hideNavFooter && <NavigationBar />}
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path='/forgot-password' element={<ForgotPassword />} />
              <Route path="/sports" element={<SportsPage />} />
              <Route path="/field-details/:fieldId" element={<FieldDetails />} />
              <Route path="/fields" element={<FieldsPage />} />
              <Route path='/add-field' element={<AddFieldForm />} />
              <Route path='/add-facility' element={<AddFacilityForm />} />
              <Route path='/add-sport' element={<AddSportForm />} />
              <Route path="/confirm-email" element={<ConfirmEmail />} />
              <Route path='/forgot-password' element={<ForgotPassword />} />
              <Route path='/reset-password' element={<ResetPassword />} />
              {/* <Route path="/facilities/:sportId" element={<FacilityDETAILS />} /> */}
              <Route path="/facilities" element={<FacilitiesPage />} />
              <Route path="/profile" element={<Profile />} />
              <Route path='/admin-dashboard' element={<AdminDashboard />} />
              <Route path="/aboutUs" element={<AboutUs />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          {!hideNavFooter && <Footer />}
        </ThemeProvider>
          <ToastContainer 
    position="top-right"
    autoClose={3000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={true}
    pauseOnFocusLoss
    draggable
    pauseOnHover
  />
    </div>
  );
}

export default App;
