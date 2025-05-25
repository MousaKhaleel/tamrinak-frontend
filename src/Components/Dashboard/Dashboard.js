import React from 'react';
import BookingCard from './DashboardComponents/Admin/BookingCard';
import ReportsChart from './DashboardComponents/Admin/ReportsCard';
import Sidebar from './DashboardComponents/SideBar';

import './Dashboard.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Link } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';

const Dashboard = () => {
  const { user, logoutUser } = useAuth();

  const isAdmin = user?.profile?.roles?.includes('Admin') || user?.profile?.roles?.includes('SuperAdmin');
  const isManager = user?.profile?.roles?.includes('VenueManager');

  return (
    <div dir="rtl">
      <Sidebar />
      <main id="main" className="main">
        <div className="pagetitle">
          <h1>لوحة التحكم</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/dashboard">الرئيسية</Link>
              </li>
              <li className="breadcrumb-item active">لوحة التحكم</li>
            </ol>
          </nav>
        </div>

        <section className="section dashboard">
          <div className="row">
            <div className="col-lg-10">
              <div className="row">
                {isAdmin && (
                  <>
                    <BookingCard />
                    {/* <RevenueCard /> */}
                    {/* <CustomersCard /> */}
                    <ReportsChart />
                  </>
                )}
              </div>
            </div>

            <div className="col-lg-2">
              {/* <NewsUpdates /> */}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
