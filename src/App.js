import './App.css';
import Homepage from './Components/Homepage/Homepage'
import Footer from './Components/Footer/Footer';
import NavigationBar from './Components/NavigationBar/NavigationBar';
import { ThemeProvider } from './Context/ThemeContext';
import { Routes, Route, useLocation } from 'react-router-dom';
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
import PendingRequestsList from './Components/Admin/DashboardComponents/Lists/PendingRequestsList';
import AddFieldPage from './Components/Admin/DashboardComponents/Forms/Field/AddFieldPage';
import EditFieldPage from './Components/Admin/DashboardComponents/Forms/Field/EditFieldPage';
import AddFacilityPage from './Components/Admin/DashboardComponents/Forms/Facility/AddFacilityPage';
import EditFacilityPage from './Components/Admin/DashboardComponents/Forms/Facility/EditFacilityPage';
import AddSportPage from './Components/Admin/DashboardComponents/Forms/Sport/AddSportPage';
import EditSportPage from './Components/Admin/DashboardComponents/Forms/Sport/EditSportPage';
import FAQ from './Components/Other/FAQ';

function App() {
  const location = useLocation();
  
  // Paths where we don't want to show any navbar or footer
  const authPaths = ["/auth"];
  const hideAll = authPaths.some(path => location.pathname.startsWith(path));
  
  // Admin paths where we want to show the admin navbar
  const adminPaths = [
    "/admin-dashboard", 
    "/fields/add",
    "/fields/edit/", 
    "/facility/add",
    "/facility/edit/", 
    "/sport/add",
    "/sport/edit/",
    "/sport-list",
    "/user-list",
    "/facility-list",
    "/field-list",
    "/pending-requests"
  ];
  
  const isAdminPath = adminPaths.some(path => location.pathname.startsWith(path));

  return (
    <div className="App">
      <ThemeProvider>
        {!hideAll && <NavigationBar variant={isAdminPath ? "admin" : "default"} />}
        
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path="/sports" element={<SportsPage />} />
          <Route path="/field-details/:fieldId" element={<FieldDetails />} />
          <Route path="/fields" element={<FieldsPage />} />
          <Route path="/fields/add" element={<AddFieldPage />} />
          <Route path="/fields/edit/:id" element={<EditFieldPage />} />
          <Route path='/facility/add' element={<AddFacilityPage />} />
          <Route path='/facility/edit/:id' element={<EditFacilityPage />} />
          <Route path='/sport/add' element={<AddSportPage />} />
          <Route path='/sport/edit/:id' element={<EditSportPage />} />
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
          <Route path="/pending-requests" element={<PendingRequestsList />} />
          <Route path="/aboutUs" element={<AboutUs />} />
          <Route path="/faq" element={<FAQ />} />
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