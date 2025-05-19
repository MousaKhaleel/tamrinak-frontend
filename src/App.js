import './App.css';
import Homepage from './Components/Homepage/Homepage'
import Footer from './Components/Footer/Footer';
import NavigationBar from './Components/NavigationBar/NavigationBar';
import AdminNavbar from './Components/Admin/DashboardComponents/NavBar';
import { ThemeProvider } from './Context/ThemeContext';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import AboutUs from './Components/AboutUs/AboutUs';
import AuthPage from './Components/Auth/AuthPage';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap-icons/font/bootstrap-icons.css';
import SportsPage from './Components/Sport/SportsPage';
import FacilitiesPage from './Components/Facility/FacilitiesPage';
import Profile from './Components/User/Profile';
import AdminDashboard from './Components/Admin/AdminDashboard';
import FieldsPage from './Components/Field/FieldsPage';
import FieldDetails from './Components/Field/FieldDetails';
import AddFieldForm from './Components/Admin/DashboardComponents/Forms/AddFieldForm';
import AddFacilityForm from './Components/Admin/DashboardComponents/Forms/AddFacilityForm';
import AddSportForm from './Components/Admin/DashboardComponents/Forms/AddSportForm';
import ConfirmEmail from './Components/Confirm/ConfirmEmail';
import ForgotPassword from './Components/Auth/ForgotPassword';
import PageNotFound from './Components/Other/PageNotFound';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import ResetPassword from './Components/Auth/ResetPassword';
import FacilityDetails from './Components/Facility/FacilityDetails';
import History from './Components/User/History';
import SportList from './Components/Admin/DashboardComponents/Lists/SportList';
import UserList from './Components/Admin/DashboardComponents/Lists/UserList';
import FacilityList from './Components/Admin/DashboardComponents/Lists/FacilityList';
import FieldList from './Components/Admin/DashboardComponents/Lists/FieldList';

function App() {
  const location = useLocation();
  
  // Paths where we don't want to show any navbar or footer
  const authPaths = ["/auth"];
  const hideAll = authPaths.includes(location.pathname);
  
  // Admin paths where we want to show the admin navbar
  const adminPaths = [
    "/admin-dashboard", 
    "/add-field", 
    "/add-facility", 
    "/add-sport",
    "/sport-list",
    "/user-list",
    "/facility-list",
    "/field-list"
  ];
  const isAdminPath = adminPaths.includes(location.pathname);

  return (
    <div className="App">
      <ThemeProvider>
        {!hideAll && isAdminPath && <AdminNavbar />}
        {!hideAll && !isAdminPath && <NavigationBar />}
        
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
          <Route path='/reset-password' element={<ResetPassword />} />
          <Route path="/facilities" element={<FacilitiesPage />} />
          <Route path="/facility-details/:facilityId" element={<FacilityDetails />} />
          <Route path="/profile" element={<Profile />} />
          <Route path='/history' element={<History />} />
          <Route path='/admin-dashboard' element={<AdminDashboard />} />
          <Route path="/sport-list" element={<SportList />} />
          <Route path="/user-list" element={<UserList />} />
          <Route path="/facility-list" element={<FacilityList />} />
          <Route path="/field-list" element={<FieldList />} />
          <Route path="/aboutUs" element={<AboutUs />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        
        {/* Don't show footer on admin or auth paths */}
        {!hideAll && !isAdminPath && <Footer />}
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