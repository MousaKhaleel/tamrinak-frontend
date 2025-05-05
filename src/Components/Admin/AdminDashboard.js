// AdminDashboard.jsx
import React from 'react';
import BookingCard from './DashboardComponents/BookingCard';
import ReportsChart from './DashboardComponents/ReportsCard';
import NavBar from './DashboardComponents/NavBar';
import Sidebar from './DashboardComponents/SideBar';

import './adminStyle.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div dir="rtl">
      <NavBar />
      <Sidebar />
      <main id="main" className="main">
        <div className="pagetitle">
          <h1>لوحة التحكم</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/AdminDashboard">الرئيسية</Link>
              </li>
              <li className="breadcrumb-item active">لوحة التحكم</li>
            </ol>
          </nav>
        </div>

        <section className="section dashboard">
          <div className="row">
            <div className="col-lg-10">
              <div className="row">
                <BookingCard />
                {/* <RevenueCard /> */}
                {/* <CustomersCard /> */}
                <ReportsChart />
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


export default AdminDashboard;
