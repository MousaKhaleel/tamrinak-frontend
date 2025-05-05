import React from 'react';
import { Link } from 'react-router-dom';
import './SideBar.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Sidebar = () => {
  return (
    <aside dir="rtl" id="sidebar" className="sidebar">
      <ul className="sidebar-nav" id="sidebar-nav">
        <li className="nav-item">
          <Link className="nav-link" to="/adminDashboard">
            <i className="bi bi-grid"></i>
            <span>لوحة التحكم</span>
          </Link>
        </li>

        <li className="nav-item">
          <a
            className="nav-link collapsed"
            href="#components-nav"
            data-bs-toggle="collapse"
            role="button"
            aria-expanded="false"
            aria-controls="components-nav"
          >
            <i className="bi bi-menu-button-wide"></i>
            <span>المكونات</span>
            <i className="bi bi-chevron-down me-auto"></i>
          </a>
          <ul
            id="components-nav"
            className="nav-content collapse"
            data-bs-parent="#sidebar-nav"
          >
            <li>
              <Link to="/components-alerts">
                <i className="bi bi-circle"></i>
                <span>التنبيهات</span>
              </Link>
            </li>
            <li>
              <Link to="/components-accordion">
                <i className="bi bi-circle"></i>
                <span>الأكورديون</span>
              </Link>
            </li>
            <li>
              <Link to="/components-badges">
                <i className="bi bi-circle"></i>
                <span>الشارات</span>
              </Link>
            </li>
            <li>
              <Link to="/components-breadcrumbs">
                <i className="bi bi-circle"></i>
                <span>مسار التنقل</span>
              </Link>
            </li>
            <li>
              <Link to="/components-buttons">
                <i className="bi bi-circle"></i>
                <span>الأزرار</span>
              </Link>
            </li>
          </ul>
        </li>

        <li className="nav-item">
          <a className="nav-link collapsed" data-bs-target="#forms-nav" data-bs-toggle="collapse" href="#">
            <i className="bi bi-journal-text"></i>
            <span>النماذج</span>
            <i className="bi bi-chevron-down ms-auto"></i>
          </a>
          <ul id="forms-nav" className="nav-content collapse" data-bs-parent="#sidebar-nav">
            <li>
              <Link to="/forms-elements">
                <i className="bi bi-circle"></i>
                <span>عناصر النموذج</span>
              </Link>
            </li>
            <li>
              <Link to="/forms-layouts">
                <i className="bi bi-circle"></i>
                <span>تخطيطات النماذج</span>
              </Link>
            </li>
          </ul>
        </li>

        <li className="nav-item">
          <a className="nav-link collapsed" data-bs-target="#tables-nav" data-bs-toggle="collapse" href="#">
            <i className="bi bi-layout-text-window-reverse"></i>
            <span>الجداول</span>
            <i className="bi bi-chevron-down ms-auto"></i>
          </a>
          <ul id="tables-nav" className="nav-content collapse" data-bs-parent="#sidebar-nav">
            <li>
              <Link to="/tables-general">
                <i className="bi bi-circle"></i>
                <span>الجداول العامة</span>
              </Link>
            </li>
            <li>
              <Link to="/tables-data">
                <i className="bi bi-circle"></i>
                <span>جداول البيانات</span>
              </Link>
            </li>
          </ul>
        </li>

        <li className="nav-item">
          <a className="nav-link collapsed" data-bs-target="#charts-nav" data-bs-toggle="collapse" href="#">
            <i className="bi bi-bar-chart"></i>
            <span>الرسوم البيانية</span>
            <i className="bi bi-chevron-down ms-auto"></i>
          </a>
          <ul id="charts-nav" className="nav-content collapse" data-bs-parent="#sidebar-nav">
            <li>
              <Link to="/charts-chartjs">
                <i className="bi bi-circle"></i>
                <span>Chart.js</span>
              </Link>
            </li>
            <li>
              <Link to="/charts-apexcharts">
                <i className="bi bi-circle"></i>
                <span>ApexCharts</span>
              </Link>
            </li>
            <li>
              <Link to="/charts-echarts">
                <i className="bi bi-circle"></i>
                <span>ECharts</span>
              </Link>
            </li>
          </ul>
        </li>

        <li className="nav-heading">صفحات</li>

        <li className="nav-item">
          <Link className="nav-link collapsed" to="/users-profile">
            <i className="bi bi-person"></i>
            <span>الملف الشخصي</span>
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link collapsed" to="/pages-faq">
            <i className="bi bi-question-circle"></i>
            <span>الأسئلة الشائعة</span>
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link collapsed" to="/pages-contact">
            <i className="bi bi-envelope"></i>
            <span>اتصل بنا</span>
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link collapsed" to="/pages-error-404">
            <i className="bi bi-dash-circle"></i>
            <span>خطأ 404</span>
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link collapsed" to="/pages-blank">
            <i className="bi bi-file-earmark"></i>
            <span>صفحة فارغة</span>
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
