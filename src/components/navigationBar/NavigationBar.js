// import Logo from '../../Assets/stockPhotos'
// import Logo from '../../Assets/stockPhoto/'

function NavigationBar() {
    return (
        <div>
            <header id="header">
  <div className="nav-container">
    {/* شعار الموقع */}
    <div className="logo">
      <img src="" alt="Tamrinak logo here" />
    </div>
    {/* زر القائمة (الهامبرغر) */}
    <button className="menu-toggle" aria-label="Toggle Menu">
      <span className="bar" />
      <span className="bar" />
      <span className="bar" />
    </button>
    {/* قائمة التنقل الرئيسية */}
    <nav role="navigation">
      <ul id="navbar">
        <li>
          <a href="/">الرئيسية</a>
        </li>
        <li>
          <a href="#">حول الموقع</a>
        </li>
        <li>
          <a href="#">خدماتنا</a>
        </li>
        <li>
          <a href="#">حجوزات</a>
        </li>
        <li>
          <a href="#">تواصل معنا</a>
        </li>
      </ul>
    </nav>
    <div className="nav-actions">
      <a
      href="/login"
        id="login-btn"
        aria-label="تسجيل الدخول إلى حسابك"
      >
        تسجيل الدخول
      </a>
      <a
      href="/register"
        id="create-btn"
        aria-label="إنشاء حساب جديد"
      >
        إنشاء حساب
      </a>
    </div>
  </div>
</header>

        </div>
    );
}

export default NavigationBar;