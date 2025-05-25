import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './SideBar.css';
import { useAuth } from '../../../Context/AuthContext';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1200);

  const { user, logoutUser } = useAuth();

  const isAdmin = user?.profile?.roles?.includes('Admin') || user?.profile?.roles?.includes('SuperAdmin');
  const isManager = user?.profile?.roles?.includes('VenueManager');

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1200);
      // On mobile, we want the sidebar to be closed by default
      if (window.innerWidth < 1200) {
        document.body.classList.add('sidebar-collapsed');
      } else {
        document.body.classList.remove('sidebar-collapsed');
      }
    };

    window.addEventListener('resize', handleResize);
    // Initialize on first render
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
    document.body.classList.toggle('sidebar-collapsed');
  };

  return (
    <>
      <aside dir="rtl" id="sidebar" className="sidebar">
        <ul className="sidebar-nav" id="sidebar-nav">
          <li className="nav-item">
            <Link className="nav-link2" to="/dashboard">
              <i className="bi bi-grid"></i>
              <span>Dashboard</span>
            </Link>
          </li>

          {isAdmin &&
            <li className="nav-item">
              <a
                className="nav-link2 collapsed"
                href="#components-nav"
                data-bs-toggle="collapse"
                role="button"
                aria-expanded="false"
                aria-controls="components-nav"
              >
                <i className="bi bi-menu-button-wide"></i>
                <span>Moderation</span>
                <i className="bi bi-chevron-down me-auto"></i> {/* Change ms-auto to me-auto */}
              </a>
              <ul
                id="components-nav"
                className="nav-content collapse"
                data-bs-parent="#sidebar-nav"
              >
                <li>
                  <Link to="/pending-requests">
                    <i className="bi bi-circle"></i>
                    <span>Pending Requests</span>
                  </Link>
                </li>
                <li>
                  <Link to="/sport-list">
                    <i className="bi bi-circle"></i>
                    <span>Sports</span>
                  </Link>
                </li>
                <li>
                  <Link to="/facility-list">
                    <i className="bi bi-circle"></i>
                    <span>Facilities</span>
                  </Link>
                </li>
                <li>
                  <Link to="/field-list">
                    <i className="bi bi-circle"></i>
                    <span>Fields</span>
                  </Link>
                </li>
                <li>
                  <Link to="/user-list">
                    <i className="bi bi-circle"></i>
                    <span>Users</span>
                  </Link>
                </li>
              </ul>
            </li>
          }

          {/* Forms Nav */}
          <li className="nav-item">
            <a className="nav-link2 collapsed" data-bs-target="#forms-nav" data-bs-toggle="collapse" href="#">
              <i className="bi bi-journal-text"></i>
              <span>Forms</span>
              <i className="bi bi-chevron-down ms-auto"></i>
            </a>
            <ul id="forms-nav" className="nav-content collapse" data-bs-parent="#sidebar-nav">
              <li>
                <Link to="/fields/add">
                  <i className="bi bi-circle"></i>
                  <span>Add Field</span>
                </Link>
              </li>
              <li>
                <Link to="/facility/add">
                  <i className="bi bi-circle"></i>
                  <span>Add Facility</span>
                </Link>
              </li>
              {isAdmin &&
                <li>
                  <Link to="/sport/add">
                    <i className="bi bi-circle"></i>
                    <span>Add Sport</span>
                  </Link>
                </li>
              }
            </ul>
          </li>

          {/* Pages Heading */}
          <li className="nav-heading">Pages</li>

          {/* Profile Page */}
          <li className="nav-item">
            <Link className="nav-link2 collapsed" to="/profile">
              <i className="bi bi-person"></i>
              <span>Profile</span>
            </Link>
          </li>

          {/* F.A.Q Page */}
          <li className="nav-item">
            <Link className="nav-link2 collapsed" to="/faq">
              <i className="bi bi-question-circle"></i>
              <span>F.A.Q</span>
            </Link>
          </li>

          {/* Contact Page */}
          {/* <li className="nav-item">
          <Link className="nav-link2 collapsed" to="#contact">
            <i className="bi bi-envelope"></i>
            <span>Contact</span>
          </Link>
        </li> */}

          {/* Error 404 Page */}
          <li className="nav-item">
            <Link className="nav-link2 collapsed" to="/pages-error-404">
              <i className="bi bi-dash-circle"></i>
              <span>Error 404</span>
            </Link>
          </li>
        </ul>
      </aside>
    </>
  );
};

export default Sidebar;